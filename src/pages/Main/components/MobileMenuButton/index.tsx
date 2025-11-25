import SidebarIcon from '@/assets/icons/sidebar.svg?react';
import type { MobileMenuButtonProps } from '@/types/Main';
import * as S from './MobileMenuButton.styles';

const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <S.Button onClick={onClick} aria-label="메뉴 열기">
      <SidebarIcon />
    </S.Button>
  );
};

export default MobileMenuButton;
