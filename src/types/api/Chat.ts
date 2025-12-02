export interface ChatMessage {
  userId: string;
  name: string;
  message: string;
}

export interface CreateChatRoomResponse {
  roomId: string;
}

export interface JoinChatRoomResponse {
  roomId: string;
}

export interface EndChatResponse {
  reportId: string;
}

export interface ChatMessagesResponse {
  data: {
    messageId: number;
    senderId: string;
    senderNickname: string;
    content: string;
    sentAt: string;
    isOwn: boolean;
  }[];
}
