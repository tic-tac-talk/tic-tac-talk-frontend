import { useState, useRef, useEffect, lazy } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import DropdownIcon from '@/assets/icons/angle-down.svg?react';
import LogoutIcon from '@/assets/icons/logout.svg?react';
import EditIcon from '@/assets/icons/user-edit.svg?react';
import { userAtom } from '@/atoms/userAtom';
import { useLogout, useUpdateUserInfo } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import * as S from './ProfileMenu.styles';

const ProfileEditModal = lazy(() => import('../ProfileEditModal'));

interface ProfileMenuProps {
  onCloseSidebar: () => void;
}

const ProfileMenu = ({ onCloseSidebar }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const userProfile = useAtomValue(userAtom);
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const { custom, closeModal, toast, loading, confirm } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);

    const modalId = 'logout-confirm-modal';
    confirm({
      id: modalId,
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      confirmText: '로그아웃',
      cancelText: '취소',
      onConfirm: () => {
        closeModal(modalId);
        logout(undefined, {
          onSuccess: () => {
            navigate('/landing');
          },
        });
      },
    });
  };

  const handleEditProfile = () => {
    setIsOpen(false);

    if (window.innerWidth <= 768) {
      onCloseSidebar();
    }

    const modalId = 'profile-edit-modal';
    custom({
      id: modalId,
      component: (
        <ProfileEditModal
          initialNickname={userProfile?.nickname}
          initialProfileImageUrl={userProfile?.profileImageUrl}
          onClose={() => closeModal(modalId)}
          onSave={(nickname, profileImage, isImageDeleted) => {
            loading({
              loadingText: '프로필을 업데이트하고 있어요',
              disableBackdropClick: true,
            });

            updateUserInfo(
              {
                nickname,
                image: profileImage || undefined,
                isProfileImageDeleted: isImageDeleted,
              },
              {
                onSuccess: () => {
                  closeModal('loading-modal');
                  closeModal(modalId);
                  toast({
                    content: '프로필이 업데이트되었습니다.',
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['userProfile'],
                  });
                },
                onError: () => {
                  closeModal('loading-modal');
                  toast({
                    content: '프로필 업데이트에 실패했습니다.',
                  });
                },
              },
            );
          }}
        />
      ),
      disableBackdropClick: false,
    });
  };

  return (
    <S.Container ref={menuRef}>
      <S.DropdownButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴"
        isOpen={isOpen}
      >
        <DropdownIcon />
      </S.DropdownButton>
      <S.Dropdown isOpen={isOpen}>
        <S.MenuItem onClick={handleEditProfile}>
          <EditIcon />
          <S.MenuItemText>회원 정보 수정</S.MenuItemText>
        </S.MenuItem>
        <S.MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogoutIcon />
          <S.MenuItemText>로그아웃</S.MenuItemText>
        </S.MenuItem>
      </S.Dropdown>
    </S.Container>
  );
};

export default ProfileMenu;
