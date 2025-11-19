import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Section = styled.section<{ isVisible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Description = styled.h3`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  line-height: 1.4;
`;

export const FloatingImageWrapper = styled.figure`
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.5s ease-out 0.5s;
`;
