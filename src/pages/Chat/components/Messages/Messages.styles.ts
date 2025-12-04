import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MEDIA_QUERIES } from '@/constants';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding: 24px 24px 0 24px;
  overflow-y: auto;

  ${MEDIA_QUERIES.MOBILE} {
    padding: 16px 16px 0 16px;
  }
`;

export const MessageGroup = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
`;

export const MessageRow = styled.div<{ isOwn: boolean }>`
  display: flex;
  align-items: flex-end;
  width: 100%;
  ${(props) => props.isOwn && 'justify-content: flex-end;'}
`;

export const SenderProfileContainer = styled.figure<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) =>
    props.$visible ? props.theme.COLORS.GRAY[2] : 'transparent'};
  font-size: 12px;
  align-self: flex-start;
  margin-right: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const SenderProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MessageBubble = styled.div<{
  isOwn: boolean;
  status?: string;
  position: 'single' | 'first' | 'middle' | 'last';
}>`
  max-width: 70%;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 10px 14px;
  opacity: ${(props) => (props.status === 'sending' ? 0.7 : 1)};

  ${(props) => {
    const { isOwn, position } = props;
    const baseRadius = '18px';
    const tightRadius = '4px';

    let borderRadius = '';

    if (position === 'single') {
      borderRadius = baseRadius;
    } else if (position === 'first') {
      borderRadius = isOwn
        ? `${baseRadius} ${baseRadius} ${tightRadius} ${baseRadius}`
        : `${baseRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'middle') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${tightRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'last') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${baseRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${baseRadius}`;
    }

    return css`
      border-radius: ${borderRadius};
      background-color: ${isOwn
        ? props.theme.COLORS.INDIGO[6]
        : props.theme.COLORS.GRAY[1]};
      color: ${isOwn ? 'white' : props.theme.COLORS.LABEL.PRIMARY};
    `;
  }}
`;

export const MessageTimestamp = styled.time<{ isOwn: boolean }>`
  flex-shrink: 0;
  align-self: flex-end;
  font-size: 10px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  ${(props) => (props.isOwn ? 'margin-right: 4px;' : 'margin-left: 4px;')}
  white-space: nowrap;
`;

export const MessageDateDivider = styled.div`
  text-align: center;
  margin: 16px 0;

  :first-of-type {
    margin-top: 0;
  }
`;

export const MessageDateBadge = styled.time`
  border-radius: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
`;
