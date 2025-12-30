import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackIcon from '@/assets/icons/back-arrow.svg?react';
import { CHAT_CONSTANTS } from '@/constants';
import { useEndChat, useGetChatMessages } from '@/hooks/useChat';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/Chat/Chat.styles';
import ChatInput from '@/pages/Chat/components/ChatInput';
import Messages from '@/pages/Chat/components/Messages';
import * as MessagesS from '@/pages/Chat/components/Messages/Messages.styles';
import { useChatActions } from '@/pages/Chat/hooks/useChatActions';
import { useChatMessages } from '@/pages/Chat/hooks/useChatMessages';
import { useChatParticipant } from '@/pages/Chat/hooks/useChatParticipant';
import { useChatRoom } from '@/pages/Chat/hooks/useChatRoom';
import useMessageScroll from '@/pages/Chat/hooks/useMessageScroll';
import {
  groupMessagesByDate,
  getBubblePosition,
  shouldShowProfile,
} from '@/pages/Chat/utils/messageGrouping';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  const [messageText, setMessageText] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { confirm, loading, closeModal, toast, alert } = useModal();

  const { isPending: isAnalyzing } = useEndChat();

  const { messagesEndRef, messagesContainerRef, scrollToBottom } =
    useMessageScroll();

  const { otherUserName, otherUserProfileUrl, updateParticipant } =
    useChatParticipant();

  const { isEndingChat, handleEndChatClick } = useChatActions({
    roomId,
    modal: { confirm, loading, closeModal, toast },
  });

  const isScrollAtBottom = useCallback(() => {
    const container = messagesContainerRef.current;

    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return (
      scrollTop + clientHeight >=
      scrollHeight - CHAT_CONSTANTS.SCROLL_BOTTOM_THRESHOLD_PX
    );
  }, []);

  const { messages, addMessage } = useChatMessages({
    initialMessages: undefined,
    isScrollAtBottom,
    scrollToBottom,
  });

  const { isConnected, sendMessage: sendWsMessage } = useChatWebSocket({
    roomId: roomId || '',
    onNewMessage: (message) => {
      addMessage(message);
      if (!message.isOwn && message.senderNickname && !otherUserName) {
        updateParticipant(message.senderNickname);
      }
    },
    onUserJoined: (participant) => {
      updateParticipant(participant.nickname, participant.profileUrl);
      toast({
        content: `${participant.nickname} 님이 채팅방에 참여했습니다`,
      });
    },
    onChatEnd: () => {
      if (isEndingChat) return;

      alert({
        title: '대화 종료',
        content: '상대가 대화를 종료했습니다',
        confirmText: '확인',
        onConfirm: () => {
          queryClient.invalidateQueries();
          navigate('/');
        },
      });
    },
    enabled: !!roomId,
  });

  const { hasJoined } = useChatRoom({
    roomId,
    isConnected,
    toast,
  });

  const { data: initialMessages } = useGetChatMessages(roomId || '', hasJoined);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const otherMessage = initialMessages.find((msg) => !msg.isOwn);
      if (otherMessage) {
        updateParticipant(
          otherMessage.senderNickname,
          otherMessage.senderProfileUrl || null,
        );
      }
    }
  }, [initialMessages, updateParticipant]);

  const groupedMessages = groupMessagesByDate(messages);

  const handleSendMessage = () => {
    if (!messageText.trim() || !isConnected || !otherUserName) return;

    sendWsMessage(messageText.trim());
    setMessageText('');

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <S.ChatContainer>
        <S.Header>
          <S.HeaderLeft>
            <S.BackButton onClick={handleBack}>
              <BackIcon />
            </S.BackButton>
            <S.HeaderTitle>
              {otherUserName || '상대 접속 대기 중'}
            </S.HeaderTitle>
          </S.HeaderLeft>
          <S.EndButton
            onClick={handleEndChatClick}
            disabled={isAnalyzing || !otherUserName}
          >
            대화 종료
          </S.EndButton>
        </S.Header>
        <MessagesS.Container ref={messagesContainerRef}>
          {Object.entries(groupedMessages).map(([date, dayMessages]) => (
            <div key={date}>
              <MessagesS.MessageDateDivider>
                <MessagesS.MessageDateBadge>{date}</MessagesS.MessageDateBadge>
              </MessagesS.MessageDateDivider>
              {dayMessages.map((message, index) => {
                const position = getBubblePosition(dayMessages, index);
                const prevMessage = index > 0 ? dayMessages[index - 1] : null;
                const nextMessage =
                  index < dayMessages.length - 1
                    ? dayMessages[index + 1]
                    : null;

                const currentTimeForDisplay = new Date(
                  message.sentAt,
                ).setSeconds(0, 0);
                const nextTimeForDisplay = nextMessage
                  ? new Date(nextMessage.sentAt).setSeconds(0, 0)
                  : 0;

                const currentTime = new Date(message.sentAt).getTime();
                const prevTime = prevMessage
                  ? new Date(prevMessage.sentAt).getTime()
                  : 0;

                const shouldShowTime =
                  !nextMessage ||
                  nextMessage.isOwn !== message.isOwn ||
                  nextTimeForDisplay - currentTimeForDisplay >= 60 * 1000;

                const isNewMessageGroup =
                  !prevMessage ||
                  prevMessage.isOwn !== message.isOwn ||
                  currentTime - prevTime >=
                    CHAT_CONSTANTS.MESSAGE_GROUP_TIME_THRESHOLD_MS;

                const shouldShowSenderProfile = shouldShowProfile(
                  dayMessages,
                  index,
                );

                return (
                  <Messages
                    key={`${date}-${message.messageId}-${message.sentAt}`}
                    message={message}
                    position={position}
                    shouldShowTime={shouldShowTime}
                    shouldShowProfile={shouldShowSenderProfile}
                    isNewMessageGroup={isNewMessageGroup}
                    otherUserName={otherUserName!}
                    otherUserProfileUrl={otherUserProfileUrl || undefined}
                  />
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </MessagesS.Container>
        <S.InputWrapper>
          <ChatInput
            messageText={messageText}
            isConnected={isConnected}
            otherUserJoined={!!otherUserName}
            onMessageChange={setMessageText}
            onSendMessage={handleSendMessage}
            onKeyDown={handleKeyDown}
          />
        </S.InputWrapper>
      </S.ChatContainer>
    </S.Container>
  );
};

export default Chat;
