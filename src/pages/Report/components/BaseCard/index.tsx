import type { ReactNode } from 'react';
import FloatingImage from '@/components/FloatingImage';
import * as S from './BaseCard.styles';

interface BaseCardProps {
  title: string;
  imageSrc: string;
  isActive: boolean;
  children: ReactNode;
}

const BaseCard = ({ title, imageSrc, isActive, children }: BaseCardProps) => {
  return (
    <S.Container isActive={isActive}>
      <S.ContentWrapper>
        <S.FloatingImageWrapper isActive={isActive}>
          <FloatingImage src={imageSrc} />
        </S.FloatingImageWrapper>
        <S.FixedContent isActive={isActive}>
          <S.Title>{title}</S.Title>
        </S.FixedContent>
        <S.CardContent isActive={isActive}>{children}</S.CardContent>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default BaseCard;
