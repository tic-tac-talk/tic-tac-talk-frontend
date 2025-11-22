import type { ReportSummary } from '@/types/api';
import type { HistoryItem } from '@/types/Main';

export const mapReportSummaryToHistoryItem = (
  report: ReportSummary,
): HistoryItem => ({
  id: report.id,
  title: report.title,
  date: report.createdAt,
  isPending: report.state === 'PENDING',
});
