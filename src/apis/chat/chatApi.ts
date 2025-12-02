import apiClient from '@/apis/core/apiClient';
import type {
  ApiResponse,
  CreateChatRoomResponse,
  JoinChatRoomResponse,
  EndChatResponse,
  ChatMessagesResponse,
} from '@/types/api';
import type { Message } from '@/types/Chat';

export const createChatRoom = async (): Promise<CreateChatRoomResponse> => {
  const response =
    await apiClient.post<ApiResponse<CreateChatRoomResponse>>('/chat/room');
  return response.data.data;
};

export const joinChatRoom = async (
  roomId: string,
): Promise<JoinChatRoomResponse> => {
  const response = await apiClient.post<ApiResponse<JoinChatRoomResponse>>(
    `/chat/rooms/${roomId}/join`,
  );
  return response.data.data;
};

export const endChat = async (roomId: string): Promise<EndChatResponse> => {
  const response = await apiClient.post<ApiResponse<EndChatResponse>>(
    `/chat/rooms/${roomId}/end`,
  );
  return response.data.data;
};

export const getChatMessages = async (roomId: string): Promise<Message[]> => {
  const response = await apiClient.get<ChatMessagesResponse>(
    `/chat/rooms/${roomId}/messages`,
  );
  return response.data.data;
};
