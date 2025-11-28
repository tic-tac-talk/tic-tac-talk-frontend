import type { ReportCard } from '@/pages/Report/types';
import type { ReportCard as APIReportCard } from '@/types/api';

const TYPE_MAP: Record<string, ReportCard['type']> = {
  summary: 'summary',
  analysis: 'analysis',
  behavior: 'behavior',
  coaching: 'coaching',
  mistakes: 'mistakes',
  ratio: 'ratio',
};

const TITLE_MAP: Record<string, string> = {
  summary: '대화 요약',
  analysis: '감정 · 논리 분석',
  behavior: '편향 · 대화 행동',
  mistakes: '피해야 할 대화 패턴',
  coaching: '대화 개선 팁',
  ratio: '과실 비율',
};

export const mapAPICardToReportCard = (apiCard: APIReportCard): ReportCard => {
  const mappedType = TYPE_MAP[apiCard.type] || 'summary';
  const fixedTitle = TITLE_MAP[apiCard.type] || apiCard.title;

  return {
    id: apiCard.id,
    title: fixedTitle,
    type: mappedType,
    content: apiCard.content,
  } as ReportCard;
};
