import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const getLeftPosition = (delay: number) => {
  if (delay === 0) return '15%';
  if (delay === 0.2) return '45%';
  return 'auto';
};

const getRightPosition = (delay: number) => {
  if (delay === 0.4) return '15%';
  return 'auto';
};

const bounce = keyframes`
  0% {
    top: 40px;
    height: 5px;
    border-radius: 24px 24px 12px 12px;
    transform: scaleX(1.6);
    opacity: 0.4;
  }

  40% {
    height: 12px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
`;

const Dot = styled.div<{ delay: number }>`
  position: absolute;
  left: ${(props) => getLeftPosition(props.delay)};
  right: ${(props) => getRightPosition(props.delay)};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.COLORS.INDIGO[5]};
  transform-origin: 50%;
  animation: ${bounce} 0.5s alternate infinite ease;
  animation-delay: ${(props) => props.delay}s;
`;

const Loader: React.FC = () => {
  return (
    <Container>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </Container>
  );
};

export default Loader;
