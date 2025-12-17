import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CopyIcon from '@/assets/icons/copy.svg?react';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import * as S from './ChatRoom.styles';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  const [, setCopied] = useState(false);
  const { toast } = useModal();

  const chatRoomUrl = `${window.location.origin}/chat?room=${roomId}`;

  useEffect(() => {
    if (!roomId) {
      navigate('/');
    }
  }, [roomId, navigate]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(chatRoomUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        content: '채팅방 URL이 복사되었습니다',
      });
    } catch {
      setCopied(false);
      toast({
        content: 'URL 복사에 실패했습니다',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '틱택톡',
          text: '채팅에 참여해 주세요!',
          url: chatRoomUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          handleCopyUrl();
        }
      }
    } else {
      handleCopyUrl();
    }
  };

  const handleEnterRoom = () => {
    navigate(`/chat?room=${roomId}`);
  };

  if (!roomId) {
    return null;
  }

  return (
    <S.Container>
      <S.Card>
        <S.Title>채팅방을 생성했어요</S.Title>
        <S.Description>아래 URL을 공유하여 대화를 시작하세요!</S.Description>
        <S.UrlContainer>
          <S.UrlText>{chatRoomUrl}</S.UrlText>
          <S.CopyButton onClick={handleCopyUrl} title="URL 복사">
            <CopyIcon />
          </S.CopyButton>
        </S.UrlContainer>
        <S.ButtonsWrapper>
          <Button fullWidth variant="secondary" onClick={handleShare}>
            공유하기
          </Button>
          <Button fullWidth onClick={handleEnterRoom}>
            채팅방 입장하기
          </Button>
        </S.ButtonsWrapper>
      </S.Card>
    </S.Container>
  );
};

export default ChatRoom;
