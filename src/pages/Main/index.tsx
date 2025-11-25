import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSVG from '@/assets/images/logo.svg?react';
import { PAGINATION } from '@/constants';
import { useReports } from '@/hooks/useReport';
import { mapReportSummaryToHistoryItem } from '@/pages/Main/utils/reportMappers';
import ActionsSection from './components/ActionsSection';
import MobileMenuButton from './components/MobileMenuButton';
import Sidebar from './components/Sidebar';
import WelcomeSection from './components/WelcomeSection';
import * as S from './Main.styles';

const Main = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: reportsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReports({
    size: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const historyItems = reportsData?.pages
    ? reportsData.pages.flatMap((page) =>
        page.data.content.map(mapReportSummaryToHistoryItem),
      )
    : [];

  const handleCloseSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = (): void => {
    setIsSidebarOpen(true);
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.LogoButton onClick={() => navigate('/')}>
          <LogoSVG />
        </S.LogoButton>
      </S.Header>
      <S.Container>
        <MobileMenuButton onClick={handleOpenSidebar} />
        <Sidebar
          isOpen={isSidebarOpen}
          historyItems={historyItems}
          onClose={handleCloseSidebar}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <S.MainContent>
          <S.ContentWrapper>
            <WelcomeSection />
            <ActionsSection />
          </S.ContentWrapper>
        </S.MainContent>
      </S.Container>
    </S.PageContainer>
  );
};

export default Main;
