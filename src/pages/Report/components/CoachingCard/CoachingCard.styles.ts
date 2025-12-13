import styled from '@emotion/styled';

export const ParticipantSection = styled.div`
  width: 100%;
`;

export const ParticipantName = styled.h3`
  margin-bottom: 12px;
  font-size: 1.2rem;
`;

export const AdviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AdviceItem = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 1.1rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    margin-top: 9px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.COLORS.INDIGO[4]};
    flex-shrink: 0;
  }
`;
