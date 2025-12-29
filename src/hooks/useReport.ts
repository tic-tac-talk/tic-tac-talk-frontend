import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getReportById,
  getReportsByUserId,
  type GetReportsParams,
} from '@/apis/report/reportApi';

export const useReports = (params?: Omit<GetReportsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['reports', params?.size, params?.sort],
    queryFn: ({ pageParam = 0 }) =>
      getReportsByUserId({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { last, number } = lastPage.data;
      return last ? undefined : number + 1;
    },
    initialPageParam: 0,
  });
};

export const useReport = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['report', id],
    queryFn: () => getReportById(id),
    select: (response) => response.data,
    enabled: enabled && !!id,
  });
};
