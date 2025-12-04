import styled from '@emotion/styled';
import { HEADER_HEIGHT, MEDIA_QUERIES } from '@/constants';

export const Container = styled.div<{ $keyboardHeight: number }>`
  display: flex;
  width: 100%;
  height: calc(100dvh - ${HEADER_HEIGHT.DESKTOP}px);
  padding: 0 24px 24px 24px;

  ${MEDIA_QUERIES.MOBILE} {
    height: ${(props) =>
      props.$keyboardHeight > 0
        ? `calc(100dvh - ${HEADER_HEIGHT.MOBILE}px - ${props.$keyboardHeight}px)`
        : `calc(100dvh - ${HEADER_HEIGHT.MOBILE}px)`};
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  width: 100%;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  padding: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const EndButton = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => props.theme.COLORS.GRAY[1]};
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  font-size: 12px;
  border-radius: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
