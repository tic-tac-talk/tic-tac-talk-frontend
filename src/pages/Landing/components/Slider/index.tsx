import * as S from '@/pages/Landing/components/Slider/Slider.styles';
import type { Slide } from '@/pages/Landing/types/Slide';

interface SliderProps {
  slides: Slide[];
  currentSlide: number;
  isTransitioning: boolean;
}

const Slider = ({ slides, currentSlide, isTransitioning }: SliderProps) => {
  return (
    <S.Container>
      <S.Track currentSlide={currentSlide} isTransitioning={isTransitioning}>
        {slides.map((slide) => (
          <S.Slide key={`slide-${slide.title}`}>
            <S.MockUpImage src={slide.mockUpImage} alt="" />
            <S.SlideTitle>{slide.title}</S.SlideTitle>
            <S.SlideDescription>{slide.description}</S.SlideDescription>
          </S.Slide>
        ))}
      </S.Track>
    </S.Container>
  );
};

export default Slider;
