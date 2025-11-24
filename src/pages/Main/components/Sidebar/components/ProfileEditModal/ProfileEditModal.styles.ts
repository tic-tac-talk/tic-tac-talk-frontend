import styled from '@emotion/styled';
import { Z_INDEX } from '@/constants';

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

export const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileImageEditButton = styled.button`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  & svg {
    width: 16px;
    height: 16px;
    fill: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ImageDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 144px;
  background: white;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY[2]};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) =>
    isOpen
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(4px)'};
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  z-index: ${Z_INDEX.DROPDOWN};
  padding: 4px;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.1s ease;
  border-radius: 4px;
  text-align: left;
  color: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.GRAY[0]};
  }

  & + & {
    margin-top: 2px;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;
