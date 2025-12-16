import styled from '@emotion/styled';
import { MEDIA_QUERIES } from '@/constants';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
  padding: 24px;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 16px;
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
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  padding: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }
`;

export const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: 16px;
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

export const InputWrapper = styled.div`
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;
