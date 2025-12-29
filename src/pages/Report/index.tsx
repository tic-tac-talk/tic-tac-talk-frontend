import { useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import BackIcon from '@/assets/icons/back.svg?react';
import ForwardIcon from '@/assets/icons/forward.svg?react';
import UpdateReportNameModal from '@/components/UpdateReportNameModal';
import useModal from '@/hooks/useModal';
import { useReport } from '@/hooks/useReport';
import useCardSwipe from '@/pages/Report/hooks/useCardSwipe';
import * as S from '@/pages/Report/Report.styles';
import { mapAPICardToReportCard } from '@/pages/Report/utils/mappers';
import { renderCard } from '@/pages/Report/utils/renderCard';

const Report = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('id');
  const { loading, closeModal, custom } = useModal();
  const queryClient = useQueryClient();

  const { data: reportData, isLoading } = useReport(reportId || '', !!reportId);

  const reportCards = useMemo(() => {
    if (reportData?.reportCards) {
      return reportData.reportCards.map(mapAPICardToReportCard);
    }
    return [];
  }, [reportData]);

  const participantNames = useMemo(() => {
    if (reportData) {
      return {
        A: reportData.user1Name,
        B: reportData.user2Name,
      };
    }
    return { A: '', B: '' };
  }, [reportData]);

  const {
    currentCardIndex,
    offset,
    isTransitioning,
    containerRef,
    handlers,
    goToNext,
    goToPrev,
  } = useCardSwipe({
    totalCards: reportCards.length,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  useEffect(() => {
    if (isLoading) {
      loading({
        loadingText: '분석 결과를 불러오고 있어요',
        disableBackdropClick: true,
      });
    } else {
      closeModal('loading-modal');
    }
  }, [isLoading, loading, closeModal]);

  useEffect(() => {
    if (
      reportData &&
      reportData.sourceType === 'VOICE' &&
      reportData.isNameUpdated === false
    ) {
      const modalId = 'update-report-name-modal';
      custom({
        id: modalId,
        component: (
          <UpdateReportNameModal
            reportId={reportData.id}
            chatData={reportData.chatData}
            onClose={() => closeModal(modalId)}
            onSuccess={(updatedData) => {
              queryClient.setQueryData(['report', reportId || ''], updatedData);
            }}
          />
        ),
        disableBackdropClick: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData?.id, reportData?.sourceType, reportData?.isNameUpdated]);

  if (isLoading) {
    return null;
  }

  return (
    <S.Container>
      <S.NavButton
        direction="left"
        onClick={goToPrev}
        disabled={currentCardIndex === 0}
      >
        <BackIcon />
      </S.NavButton>
      <S.NavButton
        direction="right"
        onClick={goToNext}
        disabled={currentCardIndex === reportCards.length - 1}
      >
        <ForwardIcon />
      </S.NavButton>
      <S.CardContainer ref={containerRef} {...handlers}>
        <S.CardSlider
          currentIndex={currentCardIndex}
          offset={offset}
          isTransitioning={isTransitioning}
        >
          {reportCards.map((card, index) => (
            <S.CardSlide key={card.id}>
              {renderCard({
                card,
                participantNames,
                isActive: index === currentCardIndex,
              })}
            </S.CardSlide>
          ))}
        </S.CardSlider>
      </S.CardContainer>
      <S.NavigationContainer>
        <S.PageIndicator>
          {reportCards.map((card) => (
            <S.PageDot
              key={`${card.id}-dot`}
              active={reportCards.indexOf(card) === currentCardIndex}
            />
          ))}
        </S.PageIndicator>
      </S.NavigationContainer>
    </S.Container>
  );
};

export default Report;
