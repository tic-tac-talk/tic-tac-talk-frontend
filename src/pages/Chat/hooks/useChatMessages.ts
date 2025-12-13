import { useEffect, useState, useLayoutEffect } from 'react';
import type { Message } from '@/types/Chat';

interface UseChatMessagesParams {
  initialMessages?: Message[];
  isScrollAtBottom: () => boolean;
  scrollToBottom: () => void;
}

export const useChatMessages = ({
  initialMessages,
  isScrollAtBottom,
  scrollToBottom,
}: UseChatMessagesParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useLayoutEffect(() => {
    if (previousMessagesLength === 0 && messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    } else if (messages.length > previousMessagesLength) {
      const wasAtBottom = isScrollAtBottom();

      if (wasAtBottom) {
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      }
    }

    setPreviousMessagesLength(messages.length);
  }, [messages.length, isScrollAtBottom, scrollToBottom]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    messages,
    addMessage,
  };
};
