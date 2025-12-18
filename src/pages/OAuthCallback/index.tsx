import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '@/apis/auth/authApi';
import { userAtom } from '@/atoms/userAtom';
import { storageService } from '@/services/storage';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access-token');

      if (accessToken) {
        storageService.setAccessToken(accessToken);
        window.history.replaceState({}, '', window.location.pathname);

        const userProfile = await getUserProfile();
        queryClient.setQueryData(['userProfile'], userProfile);
        setUser(userProfile);

        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl || '/', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [setUser, navigate, queryClient]);

  return null;
};

export default OAuthCallback;
