import { useState } from 'react';
import JudgeImage from '@/assets/images/judge.png';
import BaseCard from '@/pages/Report/components/BaseCard';
import type {
  BaseCardProps,
  RatioContent,
  ParticipantNames,
} from '@/pages/Report/types';
import * as S from '../BaseCard.styles';

interface RatioCardProps extends BaseCardProps {
  content: RatioContent;
  participantNames: ParticipantNames;
}

type AnimationState = 'initial' | 'revealing' | 'final';

const RatioCard = ({
  title,
  content,
  participantNames,
  hasBeenActivated = false,
  isActive = true,
}: RatioCardProps) => {
  const [animationState, setAnimationState] =
    useState<AnimationState>('initial');
  const [currentRatio, setCurrentRatio] = useState(50);
  const [showReasons, setShowReasons] = useState(false);

  const ratioAPercent = Math.round(content.ratioA * 100);
  const ratioBPercent = Math.round(content.ratioB * 100);

  const startRevealing = () => {
    setAnimationState('revealing');

    const ratioSteps = [45, 65, 35, 75, 40, 60, ratioAPercent];
    let currentIndex = 0;

    const revealInterval = setInterval(() => {
      if (currentIndex < ratioSteps.length - 1) {
        setCurrentRatio(ratioSteps[currentIndex]);
        currentIndex += 1;
      } else {
        setCurrentRatio(ratioAPercent);
        setAnimationState('final');
        clearInterval(revealInterval);

        setTimeout(() => {
          setShowReasons(true);
        }, 800);
      }
    }, 400);
  };

  return (
    <BaseCard
      title={title}
      imageSrc={JudgeImage}
      hasBeenActivated={hasBeenActivated}
      isActive={isActive}
    >
      {animationState === 'initial' && (
        <S.MeasurementPrompt>
          <S.PromptText>틱택톡이 분석한 과실 비율은 얼마일까요?</S.PromptText>
          <S.MeasureButton onClick={startRevealing}>결과 확인</S.MeasureButton>
        </S.MeasurementPrompt>
      )}

      {(animationState === 'revealing' || animationState === 'final') && (
        <S.RatioContainer>
          <S.RatioBar>
            <S.RatioFill
              ratio={currentRatio}
              isAnimating={animationState === 'revealing'}
            />
          </S.RatioBar>
          <S.RatioLabels>
            <S.RatioLabel>
              {participantNames.A}{' '}
              {animationState === 'final' ? ratioAPercent : currentRatio}%
            </S.RatioLabel>
            <S.RatioLabel>
              {participantNames.B}{' '}
              {animationState === 'final' ? ratioBPercent : 100 - currentRatio}%
            </S.RatioLabel>
          </S.RatioLabels>
        </S.RatioContainer>
      )}

      {showReasons && (
        <S.ReasonsContainer>
          <S.ReasonSection>
            <S.ParticipantName>{participantNames.A}</S.ParticipantName>
            <S.Description>{content.reasonA}</S.Description>
          </S.ReasonSection>
          <S.ReasonSection>
            <S.ParticipantName>{participantNames.B}</S.ParticipantName>
            <S.Description>{content.reasonB}</S.Description>
          </S.ReasonSection>
        </S.ReasonsContainer>
      )}
    </BaseCard>
  );
};

export default RatioCard;
