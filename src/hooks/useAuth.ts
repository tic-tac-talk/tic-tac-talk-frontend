import { useMutation, useQuery } from '@tanstack/react-query';
import {
  logout,
  reissueToken,
  getUserProfile,
  updateUserInfo,
} from '@/apis/auth/authApi';
import { storageService } from '@/services/storage';

export const useReissueToken = () => {
  return useMutation({
    mutationFn: reissueToken,
    onSuccess: (data) => {
      if (data.data) {
        storageService.setAccessToken(data.data);
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      storageService.removeAccessToken();
    },
  });
};

export const useGetUserProfile = () => {
  const hasToken = storageService.hasAccessToken();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: hasToken,
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
  });
};
