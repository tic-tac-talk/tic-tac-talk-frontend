import { useRef, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import DefaultProfileImage from '@/assets/images/default-profile.png?format=webp&as=url';
import { userAtom } from '@/atoms/userAtom';
import type { SidebarProps } from '@/types/Main';
import { formatDate } from '@/utils/formatters';
import ProfileMenu from './components/ProfileMenu';
import * as S from './Sidebar.styles';

const Sidebar = ({
  isOpen,
  historyItems,
  onClose,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: SidebarProps) => {
  const navigate = useNavigate();
  const userProfile = useAtomValue(userAtom);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore?.();
        }
      },
      { threshold: 1.0 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  const handleHistoryClick = (reportId: string, isPending?: boolean) => {
    if (isPending) return;
    navigate(`/report?id=${reportId}`);
    onClose();
  };

  return (
    <>
      <S.Overlay isOpen={isOpen} onClick={onClose} />
      <S.Container isOpen={isOpen}>
        <S.HistoryList>
          {historyItems.map((item) => (
            <S.HistoryItem
              key={item.id}
              onClick={() => handleHistoryClick(item.id, item.isPending)}
              style={{
                opacity: item.isPending ? 0.5 : 1,
                cursor: item.isPending ? 'not-allowed' : 'pointer',
              }}
            >
              <S.HistoryTitle>
                {item.isPending ? '분석 중인 대화' : item.title}
              </S.HistoryTitle>
              <S.HistoryDate>{formatDate(new Date(item.date))}</S.HistoryDate>
            </S.HistoryItem>
          ))}
          <div ref={observerTarget} style={{ height: '1px' }} />
        </S.HistoryList>
        <S.Footer>
          {userProfile && (
            <>
              <S.UserProfile>
                <S.ProfileImage>
                  <img
                    src={userProfile.profileImageUrl || DefaultProfileImage}
                    alt="프로필"
                  />
                </S.ProfileImage>
                <S.UserName>{userProfile.nickname}</S.UserName>
              </S.UserProfile>
              <ProfileMenu onCloseSidebar={onClose} />
            </>
          )}
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Sidebar;
