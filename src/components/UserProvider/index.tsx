import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { useGetUserProfile } from '@/hooks/useAuth';
import { storageService } from '@/services/storage';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useSetAtom(userAtom);
  const { data: userProfile, isError } = useGetUserProfile();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    } else if (isError) {
      setUser(null);
      storageService.removeAccessToken();
    }
  }, [userProfile, isError, setUser]);

  return children;
};

export default UserProvider;
