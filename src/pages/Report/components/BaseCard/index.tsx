import type { ReactNode } from 'react';
import FloatingImage from '@/components/FloatingImage';
import * as S from './BaseCard.styles';

interface BaseCardProps {
  title: string;
  imageSrc: string;
  hasBeenActivated: boolean;
  isActive: boolean;
  children: ReactNode;
}

const BaseCard = ({
  title,
  imageSrc,
  hasBeenActivated,
  isActive,
  children,
}: BaseCardProps) => {
  return (
    <S.Container isActive={isActive}>
      <S.ContentWrapper>
        <S.FloatingImageWrapper
          hasBeenActivated={hasBeenActivated}
          isActive={isActive}
        >
          <FloatingImage src={imageSrc} />
        </S.FloatingImageWrapper>
        <S.FixedContent hasBeenActivated={hasBeenActivated} isActive={isActive}>
          <S.Title>{title}</S.Title>
        </S.FixedContent>
        <S.CardContent hasBeenActivated={hasBeenActivated} isActive={isActive}>
          {children}
        </S.CardContent>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default BaseCard;
