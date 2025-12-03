import { useEffect, useState, useCallback, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { chatWebSocketService } from '@/services/chatWebSocket';
import { storageService } from '@/services/storage';
import type { WebSocketEvent, Message, Participant } from '@/types/Chat';

interface UseChatWebSocketOptions {
  roomId: string;
  onNewMessage?: (message: Message) => void;
  onChatEnd?: () => void;
  onUserJoined?: (participant: Participant) => void;
  enabled?: boolean;
}

export const useChatWebSocket = ({
  roomId,
  onNewMessage,
  onChatEnd,
  onUserJoined,
  enabled = true,
}: UseChatWebSocketOptions) => {
  const user = useAtomValue(userAtom);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled || !roomId) {
      return undefined;
    }

    let isMounted = true;

    const connect = async (): Promise<void> => {
      try {
        const token = storageService.getAccessToken() || '';
        await chatWebSocketService.connect(roomId, user?.userId || null, token);

        if (isMounted) {
          setIsConnected(true);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Connection failed'));
          setIsConnected(false);
        }
      }
    };

    connect();

    return () => {
      isMounted = false;
    };
  }, [enabled, roomId, user]);

  useEffect(() => {
    if (!isConnected) return undefined;

    const handleMessage = (event: WebSocketEvent) => {
      switch (event.type) {
        case 'NEW_MESSAGE':
          if (onNewMessage && event.content) {
            const rawMessage = event.content as Omit<Message, 'isOwn'>;
            const isOwn = rawMessage.senderId === user?.userId;

            const message: Message = {
              ...rawMessage,
              isOwn,
            };
            onNewMessage(message);
          }
          break;
        case 'USER_JOINED':
          if (onUserJoined && event.content) {
            const joinedData = event.content as {
              participants: Participant[];
            };
            const otherParticipant = joinedData.participants.find(
              (p) => p.userId !== user?.userId,
            );
            if (otherParticipant) {
              onUserJoined(otherParticipant);
            }
          }
          break;
        case 'CHAT_END':
          if (onChatEnd) {
            onChatEnd();
          }
          break;
        default:
          break;
      }
    };

    unsubscribeRef.current = chatWebSocketService.onMessage(handleMessage);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [isConnected, onNewMessage, onChatEnd, onUserJoined, user?.userId]);

  useEffect(() => {
    return () => {
      chatWebSocketService.disconnect();
    };
  }, []);

  const sendMessage = useCallback(
    (content: string): void => {
      if (!isConnected) {
        return;
      }
      chatWebSocketService.sendMessage(content);
    },
    [isConnected],
  );

  const endChat = useCallback((): void => {
    if (!isConnected) {
      return;
    }
    chatWebSocketService.endChat();
  }, [isConnected]);

  return {
    isConnected,
    error,
    sendMessage,
    endChat,
  };
};
