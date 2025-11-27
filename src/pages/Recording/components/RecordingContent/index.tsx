import RecordButton from '@/pages/Recording/components/RecordButton';
import * as S from '@/pages/Recording/components/RecordingContent/RecordingContent.styles';
import RecordingTimer from '@/pages/Recording/components/RecordingTimer';

interface RecordingContentProps {
  isRecording: boolean;
  recordingTime: number;
  volume: number;
  recordingError: boolean;
  onToggleRecording: () => void;
}

const getTitle = (recordingError: boolean) => {
  if (recordingError) {
    return '대화를 녹음하기 위해\n마이크 권한이 필요해요';
  }
  return '감정이 깊어지기 전에,\n기록부터 시작해 볼까요?';
};

const RecordingContent = ({
  isRecording,
  recordingTime,
  volume,
  recordingError,
  onToggleRecording,
}: RecordingContentProps) => {
  return (
    <S.Container>
      {isRecording && (
        <S.RecordingTimerContainer>
          <RecordingTimer recordingTime={recordingTime} />
        </S.RecordingTimerContainer>
      )}
      <S.RecordingContainer isRecording={isRecording}>
        {!isRecording && <S.Title>{getTitle(recordingError)}</S.Title>}
        <RecordButton
          isRecording={isRecording}
          volume={volume}
          onClick={onToggleRecording}
        />
      </S.RecordingContainer>
      <S.TimeLimits>최대 15분까지 녹음할 수 있어요.</S.TimeLimits>
    </S.Container>
  );
};

export default RecordingContent;
