import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 80dvw;
  max-width: 320px;
  padding: 24px;
  background: white;
  border-radius: 16px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 4px;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  text-align: center;
  margin-bottom: 16px;
`;

export const SpeakerOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SpeakerOption = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.COLORS.INDIGO[5] : theme.COLORS.GRAY[2]};
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.INDIGO[0] : theme.COLORS.GRAY[0]};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.COLORS.INDIGO[5]};
  }
`;

export const SpeakerLabel = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  line-height: 1.4;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputSection = styled.div`
  display: flex;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;
