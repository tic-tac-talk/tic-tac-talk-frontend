import React, { useState, useRef, useEffect } from 'react';

interface UseCardSwipeProps {
  totalCards: number;
  onCardChange?: (index: number) => void;
}

const useCardSwipe = ({ totalCards, onCardChange }: UseCardSwipeProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activatedCards, setActivatedCards] = useState(new Set([0]));

  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontalSwipe = useRef<boolean>(false);

  const handleStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isHorizontalSwipe.current = false;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    if (!isHorizontalSwipe.current) {
      const isHorizontal =
        Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10;

      if (isHorizontal) {
        isHorizontalSwipe.current = true;
      } else if (Math.abs(diffY) > 10) {
        return;
      }
    }

    if (isHorizontalSwipe.current) {
      setOffset(diffX);
    }
  };

  const handleEnd = () => {
    if (!isDragging || !isHorizontalSwipe.current) {
      setIsDragging(false);
      isHorizontalSwipe.current = false;
      return;
    }

    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;
    const threshold = Math.min(containerWidth * 0.3, 100);

    setIsDragging(false);
    setIsTransitioning(true);
    isHorizontalSwipe.current = false;

    if (offset > threshold && currentCardIndex > 0) {
      const newIndex = currentCardIndex - 1;
      setCurrentCardIndex(newIndex);
      setActivatedCards((prev) => new Set([...prev, newIndex]));
      onCardChange?.(newIndex);
    } else if (offset < -threshold && currentCardIndex < totalCards - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      setActivatedCards((prev) => new Set([...prev, newIndex]));
      onCardChange?.(newIndex);
    }

    setOffset(0);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && isHorizontalSwipe.current) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (
        isDragging &&
        isHorizontalSwipe.current &&
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsTransitioning(false);
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsTransitioning(false);
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
      if (isHorizontalSwipe.current) {
        e.preventDefault();
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  const goToNext = () => {
    if (currentCardIndex < totalCards - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      setActivatedCards((prev) => new Set([...prev, newIndex]));
      onCardChange?.(newIndex);
    }
  };

  const goToPrev = () => {
    if (currentCardIndex > 0) {
      const newIndex = currentCardIndex - 1;
      setCurrentCardIndex(newIndex);
      setActivatedCards((prev) => new Set([...prev, newIndex]));
      onCardChange?.(newIndex);
    }
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < totalCards) {
      setCurrentCardIndex(index);
      setActivatedCards((prev) => {
        const newSet = new Set(prev);

        for (let i = 0; i <= index; i += 1) {
          newSet.add(i);
        }
        return newSet;
      });
      onCardChange?.(index);
    }
  };

  return {
    currentCardIndex,
    offset,
    isTransitioning,
    isDragging,
    activatedCards,
    containerRef,
    goToNext,
    goToPrev,
    goToIndex,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  };
};

export default useCardSwipe;
