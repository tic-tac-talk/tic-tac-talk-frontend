import DefaultProfileImage from '@/assets/images/default-profile.png';
import * as S from '@/pages/Chat/components/Messages/Messages.styles';
import type { Message } from '@/types/Chat';
import { formatTime } from '@/utils/formatters';

interface MessageProps {
  message: Message;
  position: 'single' | 'first' | 'middle' | 'last';
  shouldShowTime: boolean;
  shouldShowProfile: boolean;
  isNewMessageGroup: boolean;
  otherUserName: string;
  otherUserProfileUrl?: string;
}

const Messages = ({
  message,
  position,
  shouldShowTime,
  shouldShowProfile,
  isNewMessageGroup,
  otherUserName,
  otherUserProfileUrl,
}: MessageProps) => {
  const profileImageSrc =
    message.senderProfileUrl || otherUserProfileUrl || DefaultProfileImage;

  return (
    <S.MessageGroup
      isOwn={message.isOwn}
      style={{
        marginTop: isNewMessageGroup ? '12px' : '4px',
      }}
    >
      <S.MessageRow isOwn={message.isOwn}>
        {!message.isOwn && (
          <S.SenderProfileContainer $visible={shouldShowProfile}>
            {shouldShowProfile && (
              <S.SenderProfileImage src={profileImageSrc} alt={otherUserName} />
            )}
          </S.SenderProfileContainer>
        )}
        {message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(new Date(message.sentAt))}
          </S.MessageTimestamp>
        )}
        <S.MessageBubble isOwn={message.isOwn} position={position}>
          {message.content}
        </S.MessageBubble>
        {!message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(new Date(message.sentAt))}
          </S.MessageTimestamp>
        )}
      </S.MessageRow>
    </S.MessageGroup>
  );
};

export default Messages;
