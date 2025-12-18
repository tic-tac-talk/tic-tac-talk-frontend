import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '@/atoms/userAtom';
import { useGetUserProfile } from '@/hooks/useAuth';
import { storageService } from '@/services/storage';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const { data: userProfile, isSuccess } = useGetUserProfile();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access-token');

    if (accessToken) {
      storageService.setAccessToken(accessToken);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && userProfile) {
      setUser(userProfile);

      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl || '/', { replace: true });
    }
  }, [isSuccess, userProfile, setUser, navigate]);

  return null;
};

export default OAuthCallback;
