import styled from '@emotion/styled';
import { Z_INDEX, HEADER_HEIGHT, MEDIA_QUERIES } from '@/constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100dvh - ${HEADER_HEIGHT.DESKTOP}px);
  padding: 0 32px 16px 32px;

  position: relative;
  z-index: ${Z_INDEX.BASE};

  ${MEDIA_QUERIES.MOBILE} {
    height: calc(100dvh - ${HEADER_HEIGHT.MOBILE}px);
    padding: 0 16px 16px 16px;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  height: calc(100dvh - ${HEADER_HEIGHT.DESKTOP}px - 72px - 36px);
  max-height: 800px;
  overflow: visible;
  position: relative;
  touch-action: pan-y;
  cursor: grab;
  perspective: 1000px;

  &:active {
    cursor: grabbing;
  }

  ${MEDIA_QUERIES.MOBILE} {
    height: calc(100dvh - ${HEADER_HEIGHT.MOBILE}px - 72px);
    overflow: hidden;
  }
`;

export const CardSlider = styled.div<{
  currentIndex: number;
  isTransitioning: boolean;
  offset: number;
}>`
  display: flex;
  height: 100%;
  gap: 0;
  transform: translateX(
    calc(
      ${(props) => -props.currentIndex * 100}% + ${(props) => props.offset}px
    )
  );
  transition: ${(props) =>
    props.isTransitioning
      ? 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
      : 'none'};

  @media (min-width: 769px) {
    gap: 32px;
    transform: translateX(
      calc(
        50% - 400px - ${(props) => props.currentIndex * 800}px -
          ${(props) => props.currentIndex * 32}px + ${(props) => props.offset}px
      )
    );
  }
`;

export const CardSlide = styled.div`
  min-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 32px;
  box-sizing: border-box;

  @media (min-width: 769px) {
    min-width: 800px;
    width: 800px;
    padding: 20px 0;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 0;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 12px 0;
  }
`;

export const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PageDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.COLORS.INDIGO[5] : props.theme.COLORS.GRAY[7]};
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  transform: ${(props) => (props.active ? 'scale(1.2)' : 'scale(1)')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: ${(props) =>
    props.active ? `0 0 10px ${props.theme.COLORS.INDIGO[2]}` : 'none'};
`;

export const NavButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'left' ? 'left: 40px;' : 'right: 40px;')}
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: ${Z_INDEX.DROPDOWN};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.COLORS.GRAY[7]};

  & svg {
    width: auto;
    height: 16px;
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    color: ${(props) => props.theme.COLORS.INDIGO[6]};
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }

  ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;
