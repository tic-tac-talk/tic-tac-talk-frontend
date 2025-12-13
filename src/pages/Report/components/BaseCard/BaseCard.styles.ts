import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Z_INDEX, MEDIA_QUERIES } from '@/constants';
import { fadeInUp } from '@/styles/animations';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 32px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.02),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  padding: 4rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.6);

  @media (min-width: 769px) {
    max-width: 800px;
    transform: ${(props) =>
      props.isActive ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(0)'};
    opacity: ${(props) => (props.isActive ? '1' : '0.4')};
    filter: ${(props) =>
      props.isActive ? 'none' : 'blur(2px) grayscale(40%)'};

    &:hover {
      transform: ${(props) =>
        props.isActive
          ? 'scale(1.01) translateY(-5px)'
          : 'scale(0.92) translateY(0)'};
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.08),
        0 1px 3px rgba(0, 0, 0, 0.02),
        inset 0 0 0 1px rgba(255, 255, 255, 0.8);
      opacity: ${(props) => (props.isActive ? '1' : '0.8')};
      filter: ${(props) =>
        props.isActive ? 'none' : 'blur(0px) grayscale(0%)'};
    }
  }

  ${MEDIA_QUERIES.MOBILE} {
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  position: relative;
  z-index: ${Z_INDEX.BASE};
`;

export const FixedContent = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  opacity: 1;

  ${MEDIA_QUERIES.MOBILE} {
    animation: ${(props) => (props.isActive ? fadeInUp : 'none')} 0.8s
      cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`;

export const FloatingImageWrapper = styled.figure<{ isActive: boolean }>`
  margin-bottom: 24px;
  opacity: 1;

  & img {
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
    animation: ${float} 6s ease-in-out infinite;
  }

  ${MEDIA_QUERIES.MOBILE} {
    margin-bottom: 16px;
    animation: ${(props) => (props.isActive ? fadeInUp : 'none')} 0.8s
      cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`;

export const Title = styled.h1`
  margin-bottom: 12px;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.COLORS.GRAY[9]} 0%,
    ${(props) => props.theme.COLORS.GRAY[7]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.02em;

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.h3`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${(props) => props.theme.COLORS.GRAY[7]};
  letter-spacing: -0.01em;

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 1.2rem;
  }
`;

export const CardContent = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  flex: 1;
  width: 100%;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.COLORS.GRAY[3]};
    border-radius: 3px;
  }

  opacity: 1;

  ${MEDIA_QUERIES.MOBILE} {
    animation: ${(props) => (props.isActive ? fadeInUp : 'none')} 0.8s
      cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
  }
`;

export const Description = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 1.15rem;
  line-height: 1.6;
`;

export const ParticipantName = styled.h3`
  margin-bottom: 12px;
  font-size: 1.2rem;
`;

export const SectionTitle = styled.h3`
  width: 100%;
  font-weight: 700;
  color: ${(props) => props.theme.COLORS.GRAY[8]};
  margin-bottom: 4px;

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 1.25rem;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Item = styled.div`
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.03),
    0 1px 2px rgba(0, 0, 0, 0.02);
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.06),
      0 2px 4px rgba(0, 0, 0, 0.02);
    border-color: ${(props) => props.theme.COLORS.INDIGO[2]};
  }
`;

export const ItemTitle = styled.p`
  margin-bottom: 6px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  font-weight: 700;
  font-size: 1.1rem;
`;

export const ItemDescription = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  line-height: 1.5;
  font-size: 0.95rem;

  & strong {
    margin-right: 6px;
    font-weight: 600;
    color: ${(props) => props.theme.COLORS.INDIGO[7]};
  }
`;
