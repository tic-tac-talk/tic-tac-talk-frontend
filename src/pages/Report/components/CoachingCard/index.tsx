import SuggestionImage from '@/assets/images/suggestion.png?format=webp&as=url';
import BaseCard from '@/pages/Report/components/BaseCard';
import type {
  BaseCardProps,
  CoachingContent,
  ParticipantNames,
} from '@/pages/Report/types';
import * as S from './CoachingCard.styles';

interface CoachingCardProps extends BaseCardProps {
  content: CoachingContent;
  participantNames: ParticipantNames;
}

const CoachingCard = ({
  title,
  content,
  participantNames,
  isActive = true,
}: CoachingCardProps) => {
  return (
    <BaseCard title={title} imageSrc={SuggestionImage} isActive={isActive}>
      <S.ParticipantSection>
        <S.ParticipantName>{participantNames.A} 님에게</S.ParticipantName>
        <S.AdviceList>
          {content.adviceA.map((advice) => (
            <S.AdviceItem key={advice}>{advice}</S.AdviceItem>
          ))}
        </S.AdviceList>
      </S.ParticipantSection>
      <S.ParticipantSection>
        <S.ParticipantName>{participantNames.B} 님에게</S.ParticipantName>
        <S.AdviceList>
          {content.adviceB.map((advice) => (
            <S.AdviceItem key={advice}>{advice}</S.AdviceItem>
          ))}
        </S.AdviceList>
      </S.ParticipantSection>
    </BaseCard>
  );
};

export default CoachingCard;
