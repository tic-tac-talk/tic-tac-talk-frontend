import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;

  & > * {
    animation: ${fadeInUp} 0.6s ease-out;
    animation-fill-mode: both;
  }

  & > *:nth-of-type(1) {
    animation-delay: 0.4s;
  }

  & > *:nth-of-type(2) {
    animation-delay: 0.5s;
  }
`;

export const GradientButton = styled.button`
  width: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.COLORS.INDIGO[5]} 0%,
    ${({ theme }) => theme.COLORS.INDIGO[6]} 100%
  );
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 18px;
  border-radius: 16px;
  transition: transform 0.2s ease;
  }
`;
