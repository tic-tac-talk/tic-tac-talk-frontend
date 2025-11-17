import { useState, useEffect } from 'react';

interface UseSlideTransitionProps {
  slidesLength: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  transitionDuration?: number;
  isVisible?: boolean;
}

const useSlideTransition = ({
  slidesLength,
  autoPlay = true,
  autoPlayInterval = 3000,
  transitionDuration = 600,
  isVisible = true,
}: UseSlideTransitionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = (newSlide: number) => {
    if (isTransitioning || newSlide === currentSlide) return;

    setIsTransitioning(true);
    setCurrentSlide(newSlide);

    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slidesLength;
    changeSlide(next);
  };

  useEffect(() => {
    if (!autoPlay || !isVisible || isTransitioning) return undefined;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, isVisible, isTransitioning, autoPlayInterval]);

  return {
    currentSlide,
    isTransitioning,
    goToSlide,
  };
};

export default useSlideTransition;
