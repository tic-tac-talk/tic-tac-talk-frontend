import { forwardRef } from 'react';
import * as S from '@/pages/Landing/components/FeatureSection/FeatureSection.styles';
import ScrollIndicator from '@/pages/Landing/components/ScrollIndicator';
import Slider from '@/pages/Landing/components/Slider';
import type { Slide } from '@/pages/Landing/types/Slide';

interface FeatureSectionProps {
  isVisible: boolean;
  slides: Slide[];
  currentSlide: number;
  isTransitioning: boolean;
  onScrollDown: () => void;
}

const FeatureSection = forwardRef<HTMLElement, FeatureSectionProps>(
  ({ isVisible, slides, currentSlide, isTransitioning, onScrollDown }, ref) => {
    return (
      <S.Section ref={ref} isVisible={isVisible}>
        <Slider
          slides={slides}
          currentSlide={currentSlide}
          isTransitioning={isTransitioning}
        />
        <ScrollIndicator onClick={onScrollDown} />
      </S.Section>
    );
  },
);

FeatureSection.displayName = 'FeatureSection';

export default FeatureSection;
