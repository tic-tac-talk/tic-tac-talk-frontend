import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(6deg);
  }
  20% {
    transform: rotate(-3deg);
  }
  30% {
    transform: rotate(3deg);
  }
  40% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
  60% {
    transform: rotate(-1deg);
  }
  70% {
    transform: rotate(0deg);
  }
`;

export const Container = styled.div`
  margin-bottom: 28px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const ImageWrapper = styled.img`
  width: auto;
  height: 144px;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.05));
  transform-origin: 70% 70%;
  animation:
    ${fadeInUp} 0.6s ease-out 0.1s both,
    ${wave} 3s ease-in-out 0.8s infinite;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};
  line-height: 1.25;
  word-break: keep-all;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  animation: ${fadeInUp} 0.6s ease-out 0.3s both;
`;
