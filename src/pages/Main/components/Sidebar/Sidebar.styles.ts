import styled from '@emotion/styled';
import { Z_INDEX, MEDIA_QUERIES } from '@/constants';

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;

  ${MEDIA_QUERIES.MOBILE} {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(12px);
    z-index: ${Z_INDEX.MODAL};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
  }
`;

export const Container = styled.aside<{ isOpen: boolean }>`
  width: 280px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 24px 0 0 24px;
  z-index: ${Z_INDEX.BASE};

  ${MEDIA_QUERIES.MOBILE} {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: auto;
    bottom: 0;
    z-index: ${Z_INDEX.MODAL};
    border-right: none;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 0;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
  }
`;

export const HistoryList = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.COLORS.GRAY[3]};
    border-radius: 3px;
  }
`;

export const HistoryItem = styled.li`
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s ease;
`;

export const HistoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.LABEL.PRIMARY};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HistoryDate = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.COLORS.LABEL.SECONDARY};
`;

export const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

export const ProfileImage = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.COLORS.GRAY[3]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.span`
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
