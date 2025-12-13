import React from 'react';
import AnalysisCard from '@/pages/Report/components/AnalysisCard';
import BehaviorCard from '@/pages/Report/components/BehaviorCard';
import CoachingCard from '@/pages/Report/components/CoachingCard';
import MistakesCard from '@/pages/Report/components/MistakesCard';
import RatioCard from '@/pages/Report/components/RatioCard';
import SummaryCard from '@/pages/Report/components/SummaryCard';
import type { ReportCard, ParticipantNames } from '@/pages/Report/types';

interface RenderCardProps {
  card: ReportCard;
  participantNames: ParticipantNames;
  isActive: boolean;
}

export const renderCard = ({
  card,
  participantNames,
  isActive,
}: RenderCardProps): React.ReactNode => {
  const baseProps = {
    title: card.title,
    isActive,
  };

  switch (card.type) {
    case 'summary':
      return <SummaryCard {...baseProps} content={card.content} />;

    case 'analysis':
      return (
        <AnalysisCard
          {...baseProps}
          content={card.content}
          participantNames={participantNames}
        />
      );

    case 'behavior':
      return <BehaviorCard {...baseProps} content={card.content} />;

    case 'mistakes':
      return (
        <MistakesCard
          {...baseProps}
          content={card.content}
          participantNames={participantNames}
        />
      );

    case 'coaching':
      return (
        <CoachingCard
          {...baseProps}
          content={card.content}
          participantNames={participantNames}
        />
      );

    case 'ratio':
      return (
        <RatioCard
          {...baseProps}
          content={card.content}
          participantNames={participantNames}
        />
      );

    default:
      return null;
  }
};
