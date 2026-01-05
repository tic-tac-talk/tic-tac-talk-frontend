import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LogoSVG from '@/assets/images/logo.svg?react';
import { PAGINATION } from '@/constants';
import { useReports } from '@/hooks/useReport';
import { mapReportSummaryToHistoryItem } from '@/pages/Main/utils/reportMappers';
import { reportWebSocketService } from '@/services/reportWebSocket';
import { storageService } from '@/services/storage';
import ActionsSection from './components/ActionsSection';
import MobileMenuButton from './components/MobileMenuButton';
import Sidebar from './components/Sidebar';
import WelcomeSection from './components/WelcomeSection';
import * as S from './Main.styles';

const Main = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  useEffect(() => {
    const token = storageService.getAccessToken();
    if (!token) {
      return () => {};
    }

    let unsubscribe: (() => void) | null = null;

    reportWebSocketService.connect(token).then(() => {
      unsubscribe = reportWebSocketService.onMessage((event) => {
        if (event.type === 'REPORT_COMPLETED') {
          queryClient.invalidateQueries({
            queryKey: ['reports'],
          });
        }
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      reportWebSocketService.disconnect();
    };
  }, []);

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
