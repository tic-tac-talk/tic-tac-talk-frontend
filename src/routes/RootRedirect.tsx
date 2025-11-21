import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { userAtom } from '@/atoms/userAtom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetUserProfile } from '@/hooks/useAuth';
import Main from '@/pages/Main';
import { storageService } from '@/services/storage';

const RootRedirect = () => {
  const user = useAtomValue(userAtom);
  const hasToken = storageService.hasAccessToken();
  const { isLoading } = useGetUserProfile();

  if (hasToken && (isLoading || !user)) {
    return null;
  }

  if (user) {
    return (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    );
  }

  return <Navigate to="/landing" replace />;
};

export default RootRedirect;
