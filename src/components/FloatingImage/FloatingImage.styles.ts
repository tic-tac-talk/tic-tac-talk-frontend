import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  20% {
    transform: translateY(-8%) rotate(3deg);
  }
  40% {
    transform: translateY(-16%) rotate(0deg);
  }
  60% {
    transform: translateY(-8%) rotate(-3deg);
  }
  80% {
    transform: translateY(-4%) rotate(1deg);
  }
`;

export const Container = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  pointer-events: none;

  @media (max-height: 768px) {
    height: ${(props) => props.height * 0.8}px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center bottom;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.05));
  animation: ${float} 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
