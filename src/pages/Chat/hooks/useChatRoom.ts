import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoinChatRoom } from '@/hooks/useChat';
import type { UseModalReturn } from '@/hooks/useModal';

interface UseChatRoomParams {
  roomId: string | null;
  isConnected: boolean;
  toast: UseModalReturn['toast'];
}

export const useChatRoom = ({
  roomId,
  isConnected,
  toast,
}: UseChatRoomParams) => {
  const navigate = useNavigate();
  const [hasJoined, setHasJoined] = useState(false);
  const { mutate: joinRoom } = useJoinChatRoom();

  useEffect(() => {
    if (!roomId || hasJoined || !isConnected) return;

    joinRoom(roomId, {
      onSuccess: () => {
        setHasJoined(true);
      },
      onError: () => {
        toast({
          content: '채팅방 참가에 실패했습니다',
        });
        navigate('/');
      },
    });
  }, [roomId, hasJoined, isConnected, joinRoom, toast, navigate]);

  useEffect(() => {
    if (!roomId) {
      navigate('/');
    }
  }, [roomId, navigate]);

  return { hasJoined };
};
