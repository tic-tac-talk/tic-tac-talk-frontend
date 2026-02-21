import { useAtomValue } from 'jotai';
import GreetingImage from '@/assets/images/greeting.png?format=webp&as=url';
import { userAtom } from '@/atoms/userAtom';
import * as S from './WelcomeSection.styles';

const WelcomeSection = () => {
  const userProfile = useAtomValue(userAtom);

  if (!userProfile) {
    return null;
  }

  return (
    <S.Container>
      <S.ImageWrapper src={GreetingImage} fetchPriority="high" />
      <S.Title>안녕하세요, {userProfile.nickname} 님!</S.Title>
      <S.Subtitle>어떤 대화를 살펴볼까요?</S.Subtitle>
    </S.Container>
  );
};

export default WelcomeSection;
