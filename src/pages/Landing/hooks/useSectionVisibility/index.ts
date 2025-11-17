import { useState } from 'react';

interface SectionVisibility {
  [key: string]: boolean;
}

interface UseSectionVisibilityProps {
  sections: string[];
  initialVisibility?: SectionVisibility;
}

const useSectionVisibility = ({
  sections,
  initialVisibility = {},
}: UseSectionVisibilityProps) => {
  const [visibility, setVisibility] = useState<SectionVisibility>(() => {
    const initial: SectionVisibility = {};
    sections.forEach((section) => {
      initial[section] = initialVisibility[section] || false;
    });
    return initial;
  });

  const showSection = (sectionName: string) => {
    setVisibility((prev) => ({
      ...prev,
      [sectionName]: true,
    }));
  };

  const hideSection = (sectionName: string) => {
    setVisibility((prev) => ({
      ...prev,
      [sectionName]: false,
    }));
  };

  const updateVisibilityBySectionIndex = (sectionIndex: number) => {
    sections.forEach((section, index) => {
      if (index <= sectionIndex && !visibility[section]) {
        showSection(section);
      }
    });
  };

  const isVisible = (sectionName: string) => visibility[sectionName];

  return {
    visibility,
    showSection,
    hideSection,
    updateVisibilityBySectionIndex,
    isVisible,
  };
};

export default useSectionVisibility;
