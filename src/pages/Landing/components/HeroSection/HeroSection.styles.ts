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

const fadeInLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

const fadeInRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const Title = styled.h1`
  font-weight: 700;
  line-height: 1.4;
  animation: ${fadeInLeft} 0.5s ease-out 0.5s both;
`;

export const Subtitle = styled.h3`
  margin-bottom: 3rem;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  line-height: 1.4;
  animation: ${fadeInRight} 0.5s ease-out 0.5s both;
`;

export const FloatingImageWrapper = styled.figure`
  margin: 3rem 0;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background: #fee500;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 12px;
  gap: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  & svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;
