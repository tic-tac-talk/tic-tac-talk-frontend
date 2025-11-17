import React, { useState, useEffect } from 'react';

interface UseScrollSnapProps {
  sections: React.RefObject<HTMLElement | null>[];
  containerRef?: React.RefObject<HTMLElement | null>;
  onSectionChange?: (sectionIndex: number) => void;
}

const useScrollSnap = ({
  sections,
  containerRef,
  onSectionChange,
}: UseScrollSnapProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const getCurrentSection = () => {
    const container = containerRef?.current;
    if (!container) return 0;

    const containerRect = container.getBoundingClientRect();

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i].current;
      if (!section) continue;

      const rect = section.getBoundingClientRect();
      if (rect.top - containerRect.top <= containerRect.height * 0.5) {
        return i;
      }
    }
    return 0;
  };

  const scrollToSection = (sectionIndex: number) => {
    const container = containerRef?.current;
    const section = sections[sectionIndex]?.current;
    if (!container || !section) return;

    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const scrollTop =
      container.scrollTop + (sectionRect.top - containerRect.top);

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const newSection = getCurrentSection();
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        onSectionChange?.(newSection);
      }
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [sections, containerRef, onSectionChange]);

  const handleScrollDown = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  };

  return {
    currentSection,
    scrollToSection,
    handleScrollDown,
  };
};

export default useScrollSnap;
