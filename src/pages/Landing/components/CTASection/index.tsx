import { forwardRef } from 'react';
import ChatImage from '@/assets/images/chat.png';
import FloatingImage from '@/components/FloatingImage';
import * as S from '@/pages/Landing/components/CTASection/CTASection.styles';

interface CTASectionProps {
  isVisible: boolean;
}

const CTASection = forwardRef<HTMLElement, CTASectionProps>(
  ({ isVisible }, ref) => {
    return (
      <S.Section ref={ref} isVisible={isVisible}>
        <S.FloatingImageWrapper>
          <FloatingImage src={ChatImage} />
        </S.FloatingImageWrapper>
        <S.Title>
          감정을 빼고 보면
          <br />
          누구 말이 맞을까요?
        </S.Title>
        <S.Description>지금 틱택톡에서 확인해 보세요.</S.Description>
      </S.Section>
    );
  },
);

CTASection.displayName = 'CTASection';

export default CTASection;
