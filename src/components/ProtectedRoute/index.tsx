import React from 'react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { userAtom } from '@/atoms/userAtom';
import { storageService } from '@/services/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAtomValue(userAtom);
  const hasToken = storageService.hasAccessToken();

  if (!hasToken) {
    sessionStorage.setItem(
      'redirectAfterLogin',
      window.location.pathname + window.location.search,
    );
    return <Navigate to="/landing" replace />;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
