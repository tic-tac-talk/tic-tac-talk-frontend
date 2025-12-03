import { Client } from '@stomp/stompjs';
import type {
  WebSocketMessage,
  SendMessageContent,
  ChatEndContent,
  WebSocketEvent,
} from '@/types/Chat';
import type { IFrame, IMessage } from '@stomp/stompjs';

type WebSocketMessageHandler = (message: WebSocketEvent) => void;

const WEBSOCKET_CONFIG = {
  URL: import.meta.env.VITE_WS_URL,
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY_MS: 1000,
  HEARTBEAT_INTERVAL_MS: 10000,
} as const;

class ChatWebSocketService {
  private client: Client | null = null;
  private roomId: string | null = null;
  private userId: string | null = null;
  private messageHandlers: WebSocketMessageHandler[] = [];
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS;
  private reconnectDelayMs = WEBSOCKET_CONFIG.RECONNECT_DELAY_MS;

  connect(roomId: string, userId: string | null, token: string): Promise<void> {
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
      this.roomId = roomId;
      this.userId = userId;

      this.client = new Client({
        brokerURL: WEBSOCKET_CONFIG.URL,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
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
      if (this.roomId !== null && this.client) {
        this.client.activate();
      }
    }, delay);
  }

  private subscribeToTopics(): void {
    if (!this.client || this.roomId === null) return;

    this.client.subscribe(`/topic/room/${this.roomId}`, (message: IMessage) => {
      try {
        const event: WebSocketEvent = JSON.parse(message.body);
        this.notifyMessageHandlers(event);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error parsing message:', error);
      }
    });

    if (this.userId) {
      this.client.subscribe(
        `/topic/user-room-updates/${this.userId}`,
        (message: IMessage) => {
          try {
            const event: WebSocketEvent = JSON.parse(message.body);
            this.notifyMessageHandlers(event);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error parsing user update:', error);
          }
        },
      );
    }
  }

  sendMessage(content: string): void {
    if (!this.client?.connected || this.roomId === null) {
      return;
    }

    const message: WebSocketMessage<SendMessageContent> = {
      type: 'SEND_MESSAGE',
      content: {
        roomId: this.roomId,
        message: content,
      },
    };

    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    });
  }

  endChat(): void {
    if (!this.client?.connected || this.roomId === null) {
      return;
    }

    const message: WebSocketMessage<ChatEndContent> = {
      type: 'CHAT_END',
      content: {
        roomId: this.roomId,
      },
    };

    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    });
  }

  onMessage(handler: WebSocketMessageHandler): () => void {
    this.messageHandlers.push(handler);

    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  private notifyMessageHandlers(event: WebSocketEvent): void {
    this.messageHandlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in message handler:', error);
      }
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.roomId = null;
    this.userId = null;
    this.messageHandlers = [];
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}

export const chatWebSocketService = new ChatWebSocketService();
