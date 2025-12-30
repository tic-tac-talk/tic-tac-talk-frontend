import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Z_INDEX, MEDIA_QUERIES } from '@/constants';
import { fadeInUp } from '@/styles/animations';

export const Wrapper = styled.div`
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
    filter: blur(8px);
  }
  50% {
    opacity: 0.8;
    filter: blur(12px);
  }
`;

export const Container = styled.button<{
  isRecording: boolean;
  volume?: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    border 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.06s cubic-bezier(0.2, 0, 0.2, 1),
    box-shadow 0.06s cubic-bezier(0.2, 0, 0.2, 1);
  z-index: ${Z_INDEX.DROPDOWN};

  background: ${(props) =>
    props.isRecording
      ? 'linear-gradient(135deg, rgba(254, 202, 202, 0.25) 0%, rgba(252, 165, 165, 0.15) 50%, rgba(239, 68, 68, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)'};

  border: 1px solid
    ${(props) =>
      props.isRecording
        ? 'rgba(254, 202, 202, 0.4)'
        : 'rgba(255, 255, 255, 0.5)'};

  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);

  box-shadow: ${(props) =>
    props.isRecording
      ? `
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 1px 0 rgba(239, 68, 68, 0.15),
        inset 0 8px 16px -8px rgba(254, 202, 202, 0.4),
        inset 0 -8px 16px -8px rgba(239, 68, 68, 0.2),
        0 4px 12px rgba(239, 68, 68, 0.15),
        0 8px 24px rgba(239, 68, 68, 0.1),
        0 16px 48px rgba(239, 68, 68, 0.08),
        0 0 0 ${3 + (props.volume || 0) * 0.4}px rgba(239, 68, 68, ${0.12 + (props.volume || 0) * 0.004}),
        0 0 0 ${6 + (props.volume || 0) * 0.8}px rgba(239, 68, 68, ${0.06 + (props.volume || 0) * 0.002})
      `
      : `
        inset 0 1px 2px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 2px 0 rgba(99, 102, 241, 0.1),
        inset 0 8px 24px -12px rgba(255, 255, 255, 0.5),
        inset 0 -8px 24px -12px rgba(165, 180, 252, 0.3),
        0 4px 12px rgba(99, 102, 241, 0.08),
        0 8px 24px rgba(99, 102, 241, 0.06),
        0 16px 48px rgba(99, 102, 241, 0.04),
        0 0 0 1px rgba(255, 255, 255, 0.3)
      `};

  transform: ${(props) =>
    props.isRecording && props.volume
      ? `scale(${1 + props.volume * 0.01})`
      : 'scale(1)'};
  will-change: ${(props) =>
    props.isRecording ? 'transform, box-shadow' : 'auto'};

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: ${(props) =>
      props.isRecording
        ? 'linear-gradient(135deg, rgba(254, 202, 202, 0.3), rgba(239, 68, 68, 0.1))'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(165, 180, 252, 0.2))'};
    z-index: -1;
    opacity: ${(props) => (props.isRecording ? 0.6 : 0.4)};
    filter: blur(8px);
    transition:
      background 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.06s cubic-bezier(0.2, 0, 0.2, 1),
      opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${(props) =>
      props.isRecording && props.volume
        ? `scale(${1 + props.volume * 0.02})`
        : 'scale(1)'};
    will-change: ${(props) => (props.isRecording ? 'transform' : 'auto')};
    animation: ${(props) => {
      if (props.isRecording) {
        return css`
          ${pulseGlow} 2s ease-in-out infinite
        `;
      }
      return 'none';
    }};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${(props) =>
      props.isRecording
        ? 'radial-gradient(circle at 30% 30%, rgba(254, 202, 202, 0.4), transparent 60%)'
        : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent 60%)'};
    pointer-events: none;
    transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: ${(props) =>
      props.isRecording
        ? 'linear-gradient(135deg, rgba(254, 202, 202, 0.3) 0%, rgba(252, 165, 165, 0.2) 50%, rgba(239, 68, 68, 0.15) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 100%)'};

    box-shadow: ${(props) =>
      props.isRecording
        ? `
          inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 2px 0 rgba(239, 68, 68, 0.2),
          inset 0 10px 20px -10px rgba(254, 202, 202, 0.5),
          inset 0 -10px 20px -10px rgba(239, 68, 68, 0.3),
          0 6px 16px rgba(239, 68, 68, 0.2),
          0 12px 32px rgba(239, 68, 68, 0.15),
          0 20px 60px rgba(239, 68, 68, 0.1),
          0 0 0 4px rgba(239, 68, 68, 0.15),
          0 0 0 8px rgba(239, 68, 68, 0.08)
        `
        : `
          inset 0 1px 2px 0 rgba(255, 255, 255, 0.6),
          inset 0 -1px 2px 0 rgba(99, 102, 241, 0.15),
          inset 0 10px 28px -14px rgba(255, 255, 255, 0.6),
          inset 0 -10px 28px -14px rgba(165, 180, 252, 0.4),
          0 6px 16px rgba(99, 102, 241, 0.12),
          0 12px 32px rgba(99, 102, 241, 0.08),
          0 20px 60px rgba(99, 102, 241, 0.06),
          0 0 0 1px rgba(255, 255, 255, 0.4)
        `};

    transform: ${(props) =>
      props.isRecording && props.volume
        ? `scale(${1 + props.volume * 0.01})`
        : 'scale(1.05)'};

    &::before {
      opacity: ${(props) => (props.isRecording ? 0.8 : 0.6)};
      filter: blur(12px);
    }
  }

  &:active {
    transform: ${(props) =>
      props.isRecording && props.volume
        ? `scale(${1 + props.volume * 0.01})`
        : 'scale(0.98)'};

    box-shadow: ${(props) =>
      props.isRecording
        ? `
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
          inset 0 -1px 1px 0 rgba(239, 68, 68, 0.2),
          inset 0 6px 12px -6px rgba(254, 202, 202, 0.4),
          inset 0 -6px 12px -6px rgba(239, 68, 68, 0.3),
          0 2px 8px rgba(239, 68, 68, 0.15),
          0 4px 16px rgba(239, 68, 68, 0.1)
        `
        : `
          inset 0 1px 2px 0 rgba(99, 102, 241, 0.1),
          inset 0 -1px 2px 0 rgba(255, 255, 255, 0.3),
          inset 0 6px 16px -8px rgba(165, 180, 252, 0.3),
          inset 0 -6px 16px -8px rgba(255, 255, 255, 0.4),
          0 2px 8px rgba(99, 102, 241, 0.08),
          0 4px 16px rgba(99, 102, 241, 0.06)
        `};

    &::before {
      opacity: 0.3;
    }
  }

  svg {
    width: 44px;
    height: 44px;
    fill: ${(props) =>
      props.isRecording
        ? 'url(#icon-recording-gradient)'
        : 'url(#icon-idle-gradient)'};
    transition:
      fill 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
    position: relative;
    z-index: ${Z_INDEX.BASE};
  }

  ${MEDIA_QUERIES.MOBILE} {
    width: 96px;
    height: 96px;

    svg {
      width: 36px;
      height: 36px;
    }

    &:hover {
      transform: ${(props) =>
        props.isRecording && props.volume
          ? `scale(${1 + props.volume * 0.01})`
          : 'scale(1)'};
    }
  }
`;
