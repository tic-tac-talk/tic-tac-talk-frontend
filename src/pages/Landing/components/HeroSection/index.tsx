import { forwardRef } from 'react';
import KakaoIcon from '@/assets/icons/kakao.svg?react';
import JudgeImage from '@/assets/images/judge.png?format=webp&as=url';
import FloatingImage from '@/components/FloatingImage';
import * as S from '@/pages/Landing/components/HeroSection/HeroSection.styles';
import ScrollIndicator from '@/pages/Landing/components/ScrollIndicator';

interface HeroSectionProps {
  onScrollDown: () => void;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ onScrollDown }, ref) => {
    return (
      <S.Section ref={ref}>
        <S.Title>
          감정은 가볍게,
          <br />
          논리는 선명하게
        </S.Title>
        <S.FloatingImageWrapper>
          <FloatingImage src={JudgeImage} highFetchPriority />
        </S.FloatingImageWrapper>
        <S.Subtitle>
          말다툼 속 감정과 논리,
          <br />
          틱택톡이 정리해 드릴게요.
        </S.Subtitle>
        <S.LoginButton
          onClick={() => {
            window.location.href =
              'https://tictactalk.studio/oauth2/authorization/kakao';
          }}
        >
          <KakaoIcon />
          카카오 로그인
        </S.LoginButton>
        <ScrollIndicator onClick={onScrollDown} />
      </S.Section>
    );
  },
);

HeroSection.displayName = 'HeroSection';

export default HeroSection;
