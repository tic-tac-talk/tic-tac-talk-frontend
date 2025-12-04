import React, { useState, useEffect, useRef } from 'react';

const SCROLL_BOTTOM_THRESHOLD_PX = 10;
const KEYBOARD_CLOSE_DELAY_MS = 50;
const SCROLL_RESET_DELAY_MS = 0;

const useKeyboardHeight = (
  messagesContainerRef?: React.RefObject<HTMLElement | null>,
): number => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const previousScrollFromBottom = useRef(0);
  const prevKeyboardHeightRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) {
      return undefined;
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const handleResize = (): void => {
      const viewport = window.visualViewport;
      if (!viewport) return;

      if (messagesContainerRef?.current) {
        const container = messagesContainerRef.current;
        previousScrollFromBottom.current =
          container.scrollHeight - container.scrollTop - container.clientHeight;
      }

      const visualHeight = viewport.height;
      const layoutHeight = document.documentElement.clientHeight;
      const heightDiff = layoutHeight - visualHeight;

      const prevKeyboardHeight = prevKeyboardHeightRef.current;
      const newKeyboardHeight = heightDiff > 0 ? heightDiff : 0;

      setKeyboardHeight(newKeyboardHeight);
      prevKeyboardHeightRef.current = newKeyboardHeight;

      if (isSafari && heightDiff > 0) {
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, 0);
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
          }, SCROLL_RESET_DELAY_MS);
        });
      }

      if (messagesContainerRef?.current) {
        const restoreScroll = (): void => {
          const container = messagesContainerRef.current;
          if (container) {
            if (previousScrollFromBottom.current < SCROLL_BOTTOM_THRESHOLD_PX) {
              container.scrollTop =
                container.scrollHeight - container.clientHeight;
            } else {
              container.scrollTop =
                container.scrollHeight -
                container.clientHeight -
                previousScrollFromBottom.current;
            }
          }
        };

        if (prevKeyboardHeight > 0 && newKeyboardHeight === 0) {
          setTimeout(restoreScroll, KEYBOARD_CLOSE_DELAY_MS);
        } else {
          requestAnimationFrame(restoreScroll);
        }
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);

    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, [messagesContainerRef]);

  return keyboardHeight;
};

export default useKeyboardHeight;
