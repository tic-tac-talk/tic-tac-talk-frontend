import RecordIcon from '@/assets/icons/record.svg?react';
import StopIcon from '@/assets/icons/stop.svg?react';
import * as S from '@/pages/Recording/components/RecordButton/RecordButton.styles';

interface RecordButtonProps {
  isRecording: boolean;
  volume: number;
  onClick: () => void;
}

const RecordButton = ({ isRecording, volume, onClick }: RecordButtonProps) => {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient
            id="icon-idle-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="icon-recording-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fca5a5" stopOpacity="1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      <S.Wrapper>
        <S.Container
          isRecording={isRecording}
          volume={volume}
          onClick={onClick}
        >
          {isRecording ? <StopIcon /> : <RecordIcon />}
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default RecordButton;
