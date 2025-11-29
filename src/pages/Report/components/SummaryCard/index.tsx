import SummaryImage from '@/assets/images/summary.png';
import BaseCard from '@/pages/Report/components/BaseCard';
import type { BaseCardProps, SummaryContent } from '@/pages/Report/types';
import * as S from '../BaseCard.styles';

interface SummaryCardProps extends BaseCardProps {
  content: SummaryContent;
}

const SummaryCard = ({
  title,
  content,
  hasBeenActivated = false,
  isActive = true,
}: SummaryCardProps) => {
  return (
    <BaseCard
      title={title}
      imageSrc={SummaryImage}
      hasBeenActivated={hasBeenActivated}
      isActive={isActive}
    >
      <S.Subtitle>{content.summary}</S.Subtitle>
      <S.Description>{content.participantA}</S.Description>
      <S.Description>{content.participantB}</S.Description>
    </BaseCard>
  );
};

export default SummaryCard;
