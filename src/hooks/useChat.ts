import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createChatRoom,
  joinChatRoom,
  endChat,
  getChatMessages,
} from '@/apis/chat/chatApi';

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: createChatRoom,
  });
};

export const useJoinChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: string) => joinChatRoom(roomId),
  });
};

export const useEndChat = () => {
  return useMutation({
    mutationFn: (roomId: string) => endChat(roomId),
  });
};

export const useGetChatMessages = (roomId: string, enabled = true) => {
  return useQuery({
    queryKey: ['chatMessages', roomId],
    queryFn: () => getChatMessages(roomId),
    enabled: enabled && !!roomId,
  });
};
