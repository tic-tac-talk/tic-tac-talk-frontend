import type {
  WebSocketMessage,
  SendMessageContent,
  ChatEndContent,
  WebSocketEvent,
} from '@/types/Chat';
import { BaseWebSocketService } from './BaseWebSocketService';
import type { IMessage } from '@stomp/stompjs';

const CHAT_WEBSOCKET_URL = `${import.meta.env.VITE_WS_URL}/chat/ws-chat`;

class ChatWebSocketService extends BaseWebSocketService<WebSocketEvent> {
  private roomId: string | null = null;
  private userId: string | null = null;

  constructor() {
    super(CHAT_WEBSOCKET_URL);
  }

  connect(roomId: string, userId: string | null, token: string): Promise<void> {
    this.roomId = roomId;
    this.userId = userId;
    return this.createClient(token);
  }

  protected shouldReconnect(): boolean {
    return this.roomId !== null;
  }

  protected subscribeToTopics(): void {
    if (!this.client || this.roomId === null) return;

    this.client.subscribe(`/topic/room/${this.roomId}`, (message: IMessage) => {
      const event = this.parseMessage(message);
      if (event) {
        this.notifyMessageHandlers(event);
      }
    });

    if (this.userId) {
      this.client.subscribe(
        `/topic/user-room-updates/${this.userId}`,
        (message: IMessage) => {
          const event = this.parseMessage(message);
          if (event) {
            this.notifyMessageHandlers(event);
          }
        },
      );
    }
  }

  protected resetState(): void {
    this.roomId = null;
    this.userId = null;
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
}

export const chatWebSocketService = new ChatWebSocketService();
