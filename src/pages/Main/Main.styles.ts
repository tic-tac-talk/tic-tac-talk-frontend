import styled from '@emotion/styled';
import { HEADER_HEIGHT, MEDIA_QUERIES, Z_INDEX } from '@/constants';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT.DESKTOP}px;
  padding: 0 28px;
  backdrop-filter: blur(10px);
  z-index: ${Z_INDEX.HEADER};

  ${MEDIA_QUERIES.MOBILE} {
    height: ${HEADER_HEIGHT.MOBILE}px;
    padding: 0 24px;
  }
`;

export const LogoButton = styled.button`
  & svg {
    width: 80px;
    height: 30px;
    filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.1));

    ${MEDIA_QUERIES.MOBILE} {
      width: 64px;
      height: 24px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 0 24px 24px 24px;
  overflow: hidden;
`;

export const MainContent = styled.main`
  position: relative;
  flex-direction: column;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  overflow-y: auto;
  z-index: 1;
  border-radius: 0 24px 24px 0;
  background: rgba(255, 255, 255, 0.3);

  ${MEDIA_QUERIES.MOBILE} {
    border-radius: 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
`;
