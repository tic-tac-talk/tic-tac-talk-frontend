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
  background: white;
  border-radius: 24px;
  padding: 48px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeInUp} 0.6s ease-out;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 32px 24px;
  }
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 4px;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  text-align: center;
  margin-bottom: 20px;
`;

export const UrlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.COLORS.GRAY[0]};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY[2]};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
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
  border-radius: 8px;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
