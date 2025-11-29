import BehaviorImage from '@/assets/images/behavior.png';
import BaseCard from '@/pages/Report/components/BaseCard';
import type { BaseCardProps, BehaviorContent } from '@/pages/Report/types';
import * as S from '../BaseCard.styles';

interface BehaviorCardProps extends BaseCardProps {
  content: BehaviorContent;
}

const BehaviorCard = ({
  title,
  content,
  hasBeenActivated = false,
  isActive = true,
}: BehaviorCardProps) => {
  return (
    <BaseCard
      title={title}
      imageSrc={BehaviorImage}
      hasBeenActivated={hasBeenActivated}
      isActive={isActive}
    >
      <S.SectionTitle>인지 편향</S.SectionTitle>
      <S.ItemList>
        {content.biases.map((bias) => (
          <S.Item key={`${bias.title}-${bias.description}`}>
            <S.ItemTitle>{bias.title}</S.ItemTitle>
            <S.ItemDescription>{bias.description}</S.ItemDescription>
          </S.Item>
        ))}
      </S.ItemList>

      <S.SectionTitle>대화 행동</S.SectionTitle>
      <S.ItemList>
        {content.skills.map((skill) => (
          <S.Item key={`${skill.title}-${skill.description}`}>
            <S.ItemTitle>{skill.title}</S.ItemTitle>
            <S.ItemDescription>{skill.description}</S.ItemDescription>
          </S.Item>
        ))}
      </S.ItemList>
    </BaseCard>
  );
};

export default BehaviorCard;
