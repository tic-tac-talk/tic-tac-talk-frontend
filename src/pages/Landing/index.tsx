import { useRef } from 'react';
import styled from '@emotion/styled';
import MockUpImage1 from '@/assets/images/mockup1.png';
import MockUpImage2 from '@/assets/images/mockup2.png';
import MockUpImage3 from '@/assets/images/mockup3.png';
import { HEADER_HEIGHT, MEDIA_QUERIES } from '@/constants';
import CTASection from '@/pages/Landing/components/CTASection';
import FeatureSection from '@/pages/Landing/components/FeatureSection';
import HeroSection from '@/pages/Landing/components/HeroSection';
import useScrollSnap from '@/pages/Landing/hooks/useScrollSnap';
import useSectionVisibility from '@/pages/Landing/hooks/useSectionVisibility';
import useSlideTransition from '@/pages/Landing/hooks/useSlideTransition';
import type { Slide } from '@/pages/Landing/types/Slide';

const Container = styled.div`
  height: 100dvh;
  padding-bottom: ${HEADER_HEIGHT.DESKTOP}px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;

  ${MEDIA_QUERIES.MOBILE} {
    padding-bottom: ${HEADER_HEIGHT.MOBILE}px;
  }
`;

const slides: Slide[] = [
  {
    title: '말하는 대로 남기는 기록',
    description: '일일이 쓰지 않아도, 대화 내용을 음성으로 남길 수 있어요.',
    mockUpImage: MockUpImage2,
  },
  {
    title: '앱 안에서 이어지는 대화',
    description: '다른 앱 켤 필요 없이, 틱택톡에서 바로 대화를 나눠보세요.',
    mockUpImage: MockUpImage3,
  },
  {
    title: '한눈에 들어오는 레포트',
    description: '기록된 내용을 바탕으로 정리된 레포트를 확인해 보세요.',
    mockUpImage: MockUpImage1,
  },
];

const sectionNames = ['feature', 'cta'];

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featureRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const sections = [heroRef, featureRef, ctaRef];

  const { updateVisibilityBySectionIndex, isVisible } = useSectionVisibility({
    sections: sectionNames,
  });

  const { handleScrollDown } = useScrollSnap({
    sections,
    containerRef,
    onSectionChange: updateVisibilityBySectionIndex,
  });

  const { currentSlide, isTransitioning } = useSlideTransition({
    slidesLength: slides.length,
    isVisible: isVisible('feature'),
  });

  return (
    <Container ref={containerRef}>
      <HeroSection ref={heroRef} onScrollDown={handleScrollDown} />
      <FeatureSection
        ref={featureRef}
        isVisible={isVisible('feature')}
        slides={slides}
        currentSlide={currentSlide}
        isTransitioning={isTransitioning}
        onScrollDown={handleScrollDown}
      />
      <CTASection ref={ctaRef} isVisible={isVisible('cta')} />
    </Container>
  );
};

export default Landing;
