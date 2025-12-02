export interface Message {
  messageId: number;
  senderId: string;
  senderNickname: string;
  senderProfileUrl?: string | null;
  content: string;
  sentAt: string;
  isOwn: boolean;
}

export interface ChatRoom {
  roomId: string;
}

export type WebSocketMessageType = 'SEND_MESSAGE' | 'MESSAGE_READ' | 'CHAT_END';

export interface WebSocketMessage<T = unknown> {
  type: WebSocketMessageType;
  content: T;
}

export interface SendMessageContent {
  roomId: string;
  message: string;
}

export interface MessageReadContent {
  roomId: string;
  lastReadMessageId: number;
}

export interface ChatEndContent {
  roomId: string;
}

export type WebSocketEventType =
  | 'NEW_MESSAGE'
  | 'MESSAGE_READ'
  | 'CHAT_END'
  | 'USER_JOINED';

export interface WebSocketEvent<T = unknown> {
  type: WebSocketEventType;
  content: T;
}

export interface Participant {
  userId: string;
  nickname: string;
  profileUrl: string | null;
}

export interface NewMessageEvent {
  messageId: number;
  senderId: string;
  senderNickname: string;
  content: string;
  sentAt: string;
}
