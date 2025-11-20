import { QueryClient } from '@tanstack/react-query';

const QUERY_DEFAULT_OPTIONS = {
  RETRY_COUNT: 1,
  STALE_TIME: 5 * 60 * 1000,
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: QUERY_DEFAULT_OPTIONS.RETRY_COUNT,
      refetchOnWindowFocus: false,
      staleTime: QUERY_DEFAULT_OPTIONS.STALE_TIME,
    },
  },
});
