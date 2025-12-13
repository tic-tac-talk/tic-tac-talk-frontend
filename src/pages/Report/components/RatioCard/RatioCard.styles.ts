import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { fadeInUp } from '@/styles/animations';

const revealing = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

export const RatioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
`;

export const RatioBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 36px;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.COLORS.GRAY[1]};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.02);
  position: relative;
`;

export const RatioFill = styled.div<{
  ratio: number;
  isAnimating: boolean;
}>`
  height: 100%;
  width: ${(props) => props.ratio}%;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.INDIGO[4]},
    ${(props) => props.theme.COLORS.VIOLET[5]}
  );
  background-size: ${(props) =>
    props.isAnimating ? '200% 100%' : '100% 100%'};
  border-radius: 24px;
  transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: ${(props) => (props.isAnimating ? revealing : 'none')} 2s infinite
    linear;
  box-shadow: 0 2px 10px rgba(92, 124, 250, 0.3);
`;

export const RatioLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 0 8px;
`;

export const RatioLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const ReasonSection = styled.div`
  width: 100%;
`;

export const MeasurementPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -8px;
`;

export const PromptText = styled.h4`
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
`;

export const MeasureButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.COLORS.INDIGO[5]},
    ${(props) => props.theme.COLORS.VIOLET[6]}
  );
  color: white;
  border-radius: 30px;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
`;

export const ReasonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  animation: ${fadeInUp} 0.6s ease-out;
`;
