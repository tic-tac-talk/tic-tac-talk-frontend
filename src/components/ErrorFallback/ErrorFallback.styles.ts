import styled from '@emotion/styled';
import { MEDIA_QUERIES } from '@/constants';
import { fadeInUp } from '@/styles/animations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  padding: 24px;
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

export const ErrorIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;

  & svg {
    width: auto;
    height: 6rem;
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
  font-size: 1.1rem;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
