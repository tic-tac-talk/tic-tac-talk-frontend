import styled from '@emotion/styled';
import { MEDIA_QUERIES } from '@/constants';

export const Container = styled.footer`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  gap: 12px;
  padding: 16px 24px;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 16px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

export const ChatTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  max-height: 120px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 20px;
  font-size: 14px;
  padding: 12px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;

  &:focus {
    border-color: ${(props) => props.theme.COLORS.INDIGO[6]};
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.2s;

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;
