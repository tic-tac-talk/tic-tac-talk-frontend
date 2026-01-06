import type { ReportWebSocketEvent } from '@/types/api/Report';
import { BaseWebSocketService } from './BaseWebSocketService';
import type { IMessage } from '@stomp/stompjs';

const REPORT_WEBSOCKET_URL = `${import.meta.env.VITE_WS_URL}/rag/ws-report`;

class ReportWebSocketService extends BaseWebSocketService<ReportWebSocketEvent> {
  constructor() {
    super(REPORT_WEBSOCKET_URL);
  }

  connect(token: string): Promise<void> {
    return this.createClient(token);
  }

  protected subscribeToTopics(): void {
    if (!this.client) return;

    this.client.subscribe('/user/queue/notify', (message: IMessage) => {
      const event = this.parseMessage(message);
      if (event) {
        this.notifyMessageHandlers(event);
      }
    });
  }
}

export const reportWebSocketService = new ReportWebSocketService();
