import AnalysisImage from '@/assets/images/analysis.png';
import BaseCard from '@/pages/Report/components/BaseCard';
import type {
  BaseCardProps,
  AnalysisContent,
  ParticipantNames,
} from '@/pages/Report/types';
import * as S from '../BaseCard/BaseCard.styles';

interface AnalysisCardProps extends BaseCardProps {
  content: AnalysisContent;
  participantNames: ParticipantNames;
}

const AnalysisCard = ({
  title,
  content,
  participantNames,
  hasBeenActivated = false,
  isActive = true,
}: AnalysisCardProps) => {
  return (
    <BaseCard
      title={title}
      imageSrc={AnalysisImage}
      hasBeenActivated={hasBeenActivated}
      isActive={isActive}
    >
      <S.SectionTitle>감정 분석</S.SectionTitle>
      <S.ItemList>
        <S.Item>
          <S.ItemTitle>{participantNames.A}</S.ItemTitle>
          <S.ItemDescription>{content.emotionA}</S.ItemDescription>
        </S.Item>
        <S.Item>
          <S.ItemTitle>{participantNames.B}</S.ItemTitle>
          <S.ItemDescription>{content.emotionB}</S.ItemDescription>
        </S.Item>
      </S.ItemList>
      <S.SectionTitle>톤 분석</S.SectionTitle>
      <S.ItemList>
        <S.Item>
          <S.ItemTitle>{participantNames.A}</S.ItemTitle>
          <S.ItemDescription>{content.toneA}</S.ItemDescription>
        </S.Item>
        <S.Item>
          <S.ItemTitle>{participantNames.B}</S.ItemTitle>
          <S.ItemDescription>{content.toneB}</S.ItemDescription>
        </S.Item>
        <S.Item>
          <S.ItemTitle>전반적 분석</S.ItemTitle>
          <S.ItemDescription>{content.overall}</S.ItemDescription>
        </S.Item>
      </S.ItemList>
      <S.SectionTitle>논리 분석</S.SectionTitle>
      <S.ItemList>
        <S.Item>
          <S.ItemTitle>{participantNames.A}</S.ItemTitle>
          <S.ItemDescription>
            <strong>주장</strong>
            {content.argumentA}
          </S.ItemDescription>
          <S.ItemDescription>
            <strong>근거</strong>
            {content.evidenceA}
          </S.ItemDescription>
          <S.ItemDescription>
            <strong>오류</strong>
            {content.errorA}
          </S.ItemDescription>
        </S.Item>
        <S.Item>
          <S.ItemTitle>{participantNames.B}</S.ItemTitle>
          <S.ItemDescription>
            <strong>주장</strong>
            {content.argumentB}
          </S.ItemDescription>
          <S.ItemDescription>
            <strong>근거</strong>
            {content.evidenceB}
          </S.ItemDescription>
          <S.ItemDescription>
            <strong>오류</strong>
            {content.errorB}
          </S.ItemDescription>
        </S.Item>
      </S.ItemList>
    </BaseCard>
  );
};

export default AnalysisCard;
