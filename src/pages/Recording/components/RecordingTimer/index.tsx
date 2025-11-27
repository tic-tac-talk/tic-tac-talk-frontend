import styled from '@emotion/styled';

interface RecordingTimerProps {
  recordingTime: number;
}

const Timer = styled.h1`
  font-family: KakaoBigFont;
  font-size: 2.5rem;
  letter-spacing: 0.1rem;
  text-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
`;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const RecordingTimer = ({ recordingTime }: RecordingTimerProps) => {
  return <Timer>{formatTime(recordingTime)}</Timer>;
};

export default RecordingTimer;
