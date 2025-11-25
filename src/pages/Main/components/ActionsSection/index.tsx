import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '@/atoms/userAtom';
import { useCreateChatRoom } from '@/hooks/useChat';
import useModal from '@/hooks/useModal';
import * as S from './ActionsSection.styles';

const ActionsSection = () => {
  const navigate = useNavigate();
  const { loading, closeModal, toast } = useModal();
  const { mutate: createRoom } = useCreateChatRoom();
  const userProfile = useAtomValue(userAtom);

  if (!userProfile) {
    return null;
  }

  const handleStartChat = () => {
    loading({
      loadingText: '채팅방을 생성하고 있어요',
      disableBackdropClick: true,
    });

    createRoom(undefined, {
      onSuccess: (data) => {
        closeModal('loading-modal');
        navigate(`/chatroom?room=${data.roomId}`);
      },
      onError: () => {
        closeModal('loading-modal');
        toast({
          content: '채팅방 생성에 실패했습니다',
        });
      },
    });
  };

  return (
    <S.Container>
      <S.GradientButton onClick={handleStartChat}>
        새 채팅 시작
      </S.GradientButton>
      <S.GradientButton onClick={() => navigate('/recording')}>
        대화 녹음
      </S.GradientButton>
    </S.Container>
  );
};

export default ActionsSection;
