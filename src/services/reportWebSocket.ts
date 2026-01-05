import { Client } from '@stomp/stompjs';
import type { ReportWebSocketEvent } from '@/types/api/Report';
import type { IFrame, IMessage } from '@stomp/stompjs';

type ReportMessageHandler = (event: ReportWebSocketEvent) => void;

const WEBSOCKET_CONFIG = {
  URL: `${import.meta.env.VITE_WS_URL}/rag/ws-report`,
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY_MS: 1000,
  HEARTBEAT_INTERVAL_MS: 10000,
} as const;

class ReportWebSocketService {
  private client: Client | null = null;
  private messageHandlers: ReportMessageHandler[] = [];
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS;
  private reconnectDelayMs = WEBSOCKET_CONFIG.RECONNECT_DELAY_MS;

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.client?.connected) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error('Connection already in progress'));
        return;
      }

      this.isConnecting = true;

      this.client = new Client({
        brokerURL: `${WEBSOCKET_CONFIG.URL}?token=${token}`,
        reconnectDelay: this.reconnectDelayMs,
        heartbeatIncoming: WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL_MS,
        heartbeatOutgoing: WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL_MS,
        onConnect: () => {
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.subscribeToTopics();
          resolve();
        },
        onStompError: (frame: IFrame) => {
          this.isConnecting = false;
          reject(new Error(frame.headers.message || 'STOMP connection error'));
        },
        onWebSocketError: () => {
          this.isConnecting = false;
          reject(new Error('WebSocket connection error'));
        },
        onDisconnect: () => {
          this.handleReconnect();
        },
      });

      this.client.activate();
    });
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts += 1;
    const delay = this.reconnectDelayMs * this.reconnectAttempts;

    setTimeout(() => {
      if (this.client) {
        this.client.activate();
      }
    }, delay);
  }

  private subscribeToTopics(): void {
    if (!this.client) return;

    this.client.subscribe('/user/queue/notify', (message: IMessage) => {
      try {
        const event: ReportWebSocketEvent = JSON.parse(message.body);
        this.notifyMessageHandlers(event);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error parsing report notification:', error);
      }
    });
  }

  onMessage(handler: ReportMessageHandler): () => void {
    this.messageHandlers.push(handler);

    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  private notifyMessageHandlers(event: ReportWebSocketEvent): void {
    this.messageHandlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in report message handler:', error);
      }
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.messageHandlers = [];
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}

export const reportWebSocketService = new ReportWebSocketService();
