import styled from '@emotion/styled';
import { Z_INDEX } from '@/constants';

export const Container = styled.div``;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 6px;

  svg {
    width: auto;
    height: 12px;
    fill: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
  }
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
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

export const MenuItem = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  transition: background-color 0.1s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;

  svg {
    width: auto;
    height: 14px;
    fill: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.COLORS.GRAY[0]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & + & {
    margin-top: 2px;
  }
`;

export const MenuItemText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};
`;
