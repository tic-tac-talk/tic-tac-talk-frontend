import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { HEADER_HEIGHT, MEDIA_QUERIES } from '@/constants';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: ${HEADER_HEIGHT.DESKTOP}px;

  ${MEDIA_QUERIES.MOBILE} {
    padding-top: ${HEADER_HEIGHT.MOBILE}px;
  }
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
