import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorFallback';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

const GlobalErrorBoundary = ({ children }: GlobalErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
