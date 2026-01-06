import { Client } from '@stomp/stompjs';
import type { IFrame, IMessage } from '@stomp/stompjs';

export type MessageHandler<T> = (event: T) => void;

export interface WebSocketConfig {
  maxReconnectAttempts: number;
  reconnectDelayMs: number;
  heartbeatIntervalMs: number;
}

export const DEFAULT_WEBSOCKET_CONFIG: WebSocketConfig = {
  maxReconnectAttempts: 5,
  reconnectDelayMs: 1000,
  heartbeatIntervalMs: 10000,
};

export abstract class BaseWebSocketService<T> {
  protected client: Client | null = null;
  protected messageHandlers: MessageHandler<T>[] = [];
  protected isConnecting = false;
  protected reconnectAttempts = 0;
  protected config: WebSocketConfig;
  protected webSocketUrl: string;

  protected constructor(
    webSocketUrl: string,
    config: WebSocketConfig = DEFAULT_WEBSOCKET_CONFIG,
  ) {
    this.webSocketUrl = webSocketUrl;
    this.config = config;
  }

  protected createClient(token: string): Promise<void> {
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
        brokerURL: this.webSocketUrl,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnectDelay: this.config.reconnectDelayMs,
        heartbeatIncoming: this.config.heartbeatIntervalMs,
        heartbeatOutgoing: this.config.heartbeatIntervalMs,
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

  protected shouldReconnect(): boolean {
    return true;
  }

  protected handleReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts += 1;
    const delay = this.config.reconnectDelayMs * this.reconnectAttempts;

    setTimeout(() => {
      if (this.shouldReconnect() && this.client) {
        this.client.activate();
      }
    }, delay);
  }

  protected parseMessage(message: IMessage): T | null {
    try {
      return JSON.parse(message.body) as T;
    } catch {
      return null;
    }
  }

  protected notifyMessageHandlers(event: T): void {
    this.messageHandlers.forEach((handler) => {
      handler(event);
    });
  }

  onMessage(handler: MessageHandler<T>): () => void {
    this.messageHandlers.push(handler);

    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  protected resetState(): void {}

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.messageHandlers = [];
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.resetState();
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }

  protected abstract subscribeToTopics(): void;
}
