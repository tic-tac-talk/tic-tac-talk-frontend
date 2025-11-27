import styled from '@emotion/styled';
import { HEADER_HEIGHT, Z_INDEX, MEDIA_QUERIES } from '@/constants';
import { fadeInUp } from '@/styles/animations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - ${HEADER_HEIGHT.DESKTOP}px);
  text-align: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  position: relative;

  ${MEDIA_QUERIES.MOBILE} {
    min-height: calc(100dvh - ${HEADER_HEIGHT.MOBILE}px);
  }
`;

export const RecordingContainer = styled.div<{ isRecording: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: ${(props) => (props.isRecording ? 'absolute' : 'relative')};
  top: ${(props) => (props.isRecording ? '50%' : 'auto')};
  transform: ${(props) => (props.isRecording ? 'translateY(-50%)' : 'none')};
  z-index: ${Z_INDEX.DROPDOWN};
  transition: all 0.5s ease-out;
  height: ${(props) => (props.isRecording ? 'auto' : '100%')};
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 48px;
  white-space: pre-line;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  line-height: 1.5;
  opacity: 0.9;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const TimeLimits = styled.p`
  position: absolute;
  bottom: 32px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 0.875rem;
  opacity: 0.7;
`;

export const RecordingTimerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(120px);
  z-index: ${Z_INDEX.BASE};
`;
