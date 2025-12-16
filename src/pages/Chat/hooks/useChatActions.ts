import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEndChat } from '@/hooks/useChat';
import type { UseModalReturn } from '@/hooks/useModal';

interface UseChatActionsParams {
  roomId: string | null;
  modal: {
    confirm: UseModalReturn['confirm'];
    loading: UseModalReturn['loading'];
    closeModal: UseModalReturn['closeModal'];
    toast: UseModalReturn['toast'];
  };
}

export const useChatActions = ({ roomId, modal }: UseChatActionsParams) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEndingChat, setIsEndingChat] = useState(false);
  const { mutate: endChatMutation } = useEndChat();

  const handleEndChat = (): void => {
    if (!roomId) return;

    setIsEndingChat(true);

    modal.loading({
      loadingText: '대화를 종료하고 있어요',
      disableBackdropClick: true,
    });

    endChatMutation(roomId, {
      onSuccess: () => {
        modal.closeModal('loading-modal');
        modal.toast({
          content:
            '대화를 종료했어요. 분석이 끝나면 레포트를 확인할 수 있어요.',
        });
        queryClient.invalidateQueries();
        navigate('/');
      },
      onError: () => {
        modal.closeModal('loading-modal');
        setIsEndingChat(false);
        modal.toast({
          content: '대화 종료에 실패했습니다',
        });
      },
    });
  };

  const handleEndChatClick = (): void => {
    modal.confirm({
      title: '채팅 종료',
      content:
        '채팅을 종료하면 상대와의 연결이 해제되며, 이 채팅방에서는 대화를 이어갈 수 없습니다. 종료 후 대화 분석이 시작됩니다.',
      confirmText: '종료',
      cancelText: '취소',
      onConfirm: handleEndChat,
    });
  };

  return {
    isEndingChat,
    handleEndChatClick,
  };
};
