import styled from '@emotion/styled';
import { Z_INDEX, MEDIA_QUERIES } from '@/constants';

export const Button = styled.button`
  display: none;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  z-index: ${Z_INDEX.HEADER};

  & svg {
    width: auto;
    height: 20px;
    fill: white;
  }

  ${MEDIA_QUERIES.MOBILE} {
    display: flex;
  }
`;
