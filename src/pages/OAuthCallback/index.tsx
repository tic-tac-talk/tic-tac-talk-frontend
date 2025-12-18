import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '@/services/storage';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = (): void => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access-token');

      if (accessToken) {
        storageService.setAccessToken(accessToken);
        window.history.replaceState({}, '', window.location.pathname);

        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        sessionStorage.removeItem('redirectAfterLogin');

        navigate(redirectUrl || '/', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return null;
};

export default OAuthCallback;
