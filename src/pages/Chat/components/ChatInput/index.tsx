import { useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import SendIcon from '@/assets/icons/send.svg?react';
import * as S from '@/pages/Chat/components/ChatInput/ChatInput.styles';
import theme from '@/styles/theme';

interface ChatInputProps {
  messageText: string;
  isConnected: boolean;
  otherUserJoined: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

const ChatInput = ({
  messageText,
  isConnected,
  otherUserJoined,
  onMessageChange,
  onSendMessage,
  onKeyDown,
}: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const canSendMessage = isConnected && otherUserJoined && messageText.trim();

  return (
    <S.Container>
      <S.InputWrapper>
        <S.ChatTextarea
          ref={inputRef}
          placeholder={
            otherUserJoined
              ? '메시지를 입력하세요'
              : '상대가 입장할 때까지 기다려주세요'
          }
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={!isConnected || !otherUserJoined}
        />
      </S.InputWrapper>
      <S.SendButton
        onClick={onSendMessage}
        onMouseDown={(e) => e.preventDefault()}
        disabled={!canSendMessage}
      >
        <SendIcon
          fill={canSendMessage ? theme.COLORS.INDIGO[6] : theme.COLORS.GRAY[3]}
        />
      </S.SendButton>
    </S.Container>
  );
};

export default ChatInput;
