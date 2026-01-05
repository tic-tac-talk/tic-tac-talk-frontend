import type { ChatMessage } from './Chat';

export interface AnalysisContent {
  emotionA: string;
  emotionB: string;
  toneA: string;
  toneB: string;
  overall: string;
  argumentA: string;
  evidenceA: string;
  argumentB: string;
  evidenceB: string;
  errorA: string;
  errorB: string;
}

export interface BiasSkillItem {
  title: string;
  description: string;
}

export interface BehaviorContent {
  biases: BiasSkillItem[];
  skills: BiasSkillItem[];
}

export interface CoachingContent {
  adviceA: string[];
  adviceB: string[];
}

export interface Mistake {
  type: string;
  definition: string;
  participantA: boolean;
  participantB: boolean;
  severity: 'low' | 'medium' | 'high';
  evidence: string;
}

export interface MistakeContent {
  mistakes: Mistake[];
}

export interface RatioContent {
  ratioA: number;
  ratioB: number;
  reasonA: string;
  reasonB: string;
}

export interface SummaryContent {
  summary: string;
  participantA: string;
  participantB: string;
}

export type ReportCard =
  | { id: string; title: string; type: 'summary'; content: SummaryContent }
  | { id: string; title: string; type: 'analysis'; content: AnalysisContent }
  | { id: string; title: string; type: 'behavior'; content: BehaviorContent }
  | {
      id: string;
      title: string;
      type: 'coaching';
      content: CoachingContent;
    }
  | { id: string; title: string; type: 'mistakes'; content: MistakeContent }
  | { id: string; title: string; type: 'ratio'; content: RatioContent };

export interface Report {
  id: string;
  user1Id: string;
  user2Id: string;
  user1Name: string;
  user2Name: string;
  title: string;
  chatData: ChatMessage[];
  reportCards: ReportCard[];
  createdAt: string;
  state: 'PENDING' | 'COMPLETED';
  sourceType?: 'VOICE' | 'CHAT';
  isNameUpdated?: boolean;
}

export interface ReportSummary {
  id: string;
  title: string;
  createdAt: string;
  state: 'PENDING' | 'COMPLETED';
}

export interface UpdateReportUserNameRequest {
  selectedSpeaker: 'A' | 'B';
  otherUserName: string;
}

export interface ReportCompletedEvent {
  type: 'REPORT_COMPLETED';
  reportId: number;
}

export type ReportWebSocketEvent = ReportCompletedEvent;
