import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalErrorBoundary from '@/components/GlobalErrorBoundary';
import UserProvider from '@/components/UserProvider';
import { queryClient } from '@/config/queryClient';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserProvider>
          <GlobalErrorBoundary>
            <Router>{children}</Router>
          </GlobalErrorBoundary>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
