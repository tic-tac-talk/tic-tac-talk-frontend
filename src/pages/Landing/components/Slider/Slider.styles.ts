import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: clip;
`;

export const Track = styled.div<{
  currentSlide: number;
  isTransitioning: boolean;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
  transition: ${(props) =>
    props.isTransitioning
      ? 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
      : 'none'};
`;

export const Slide = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const MockUpImage = styled.img`
  height: 54dvh;
  flex-shrink: 0;
  margin-bottom: 1.5rem;
`;

export const SlideTitle = styled.h2`
  text-align: center;
  width: 80dvw;
  flex-shrink: 0;
  margin-bottom: 4px;
`;

export const SlideDescription = styled.p`
  text-align: center;
  width: 80dvw;
  flex-shrink: 0;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  line-height: 1.6;
  white-space: pre-line;
`;
