import styled from '@emotion/styled';
import { HEADER_HEIGHT, MEDIA_QUERIES } from '@/constants';
import { fadeInUp } from '@/styles/animations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - ${HEADER_HEIGHT.DESKTOP}px);
  padding: 0 24px 24px 24px;

  ${MEDIA_QUERIES.MOBILE} {
    height: calc(100dvh - ${HEADER_HEIGHT.MOBILE}px);
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 48px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeInUp} 0.6s ease-out;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 32px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 4px;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
`;

export const Description = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  font-size: 1.1rem;
  text-align: center;
`;

export const UrlContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  gap: 4px;
  background-color: ${({ theme }) => theme.COLORS.GRAY[0]};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY[2]};
  border-radius: 12px;
`;

export const UrlText = styled.p`
  flex: 1;
  font-size: 0.95rem;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`;

export const CopyButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY[2]};
  }

  &:active {
    transform: scale(0.95);
  }

  & svg {
    width: 14px;
    height: 14px;
    fill: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
