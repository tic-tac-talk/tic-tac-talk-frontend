import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  padding: 1rem;
  opacity: 0.7;
  cursor: pointer;
  animation: ${bounce} 2s infinite;
  transition: all 0.3s ease;

  &::after {
    content: '↓';
    display: block;
    font-size: 1.5rem;
  }
`;

export default ScrollIndicator;
