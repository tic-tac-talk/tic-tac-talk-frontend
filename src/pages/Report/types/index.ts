import type {
  SummaryContent,
  AnalysisContent,
  BehaviorContent,
  MistakeContent,
  CoachingContent,
  RatioContent,
  ReportCard,
} from '@/types/api';

export interface ParticipantNames {
  A: string;
  B: string;
}

export interface BaseCardProps {
  title: string;
  isActive?: boolean;
}

export type {
  ReportCard,
  SummaryContent,
  AnalysisContent,
  BehaviorContent,
  MistakeContent as MistakesContent,
  CoachingContent,
  RatioContent,
};
