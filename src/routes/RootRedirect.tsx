import { lazy, Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { userAtom } from '@/atoms/userAtom';
import PageLoader from '@/components/PageLoader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetUserProfile } from '@/hooks/useAuth';
import { storageService } from '@/services/storage';

const Main = lazy(() => import('@/pages/Main'));

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
        <Suspense fallback={<PageLoader />}>
          <Main />
        </Suspense>
      </ProtectedRoute>
    );
  }

  return <Navigate to="/landing" replace />;
};

export default RootRedirect;
