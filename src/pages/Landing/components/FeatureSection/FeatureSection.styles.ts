import styled from '@emotion/styled';

export const Section = styled.section<{ isVisible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease 0.2s;
`;
