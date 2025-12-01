import styled from '@emotion/styled';
import { HEADER_HEIGHT, MEDIA_QUERIES, Z_INDEX } from '@/constants';

export const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.HEADER};
  width: 100%;
  height: ${HEADER_HEIGHT.DESKTOP}px;
  align-items: center;
  padding: 0 28px;
  backdrop-filter: blur(10px);

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
