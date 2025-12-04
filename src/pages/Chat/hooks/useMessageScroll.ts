import { useRef, useCallback } from 'react';

const useMessageScroll = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
  };
};

export default useMessageScroll;
