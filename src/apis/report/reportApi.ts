import apiClient from '@/apis/core/apiClient';
import type {
  ApiResponse,
  PageResponse,
  Report,
  ReportSummary,
  UpdateReportUserNameRequest,
} from '@/types/api';

export interface GetReportsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const getReportsByUserId = async ({
  page = 0,
  size = 10,
}: GetReportsParams): Promise<ApiResponse<PageResponse<ReportSummary>>> => {
  const params: Record<string, string | number> = {
    page,
    size,
  };

  const response = await apiClient.get<
    ApiResponse<PageResponse<ReportSummary>>
  >('/rag/reports', { params });
  return response.data;
};

export const getReportById = async (
  id: string,
): Promise<ApiResponse<Report>> => {
  const response = await apiClient.get<ApiResponse<Report>>(
    `/rag/report/${id}`,
  );
  return response.data;
};

export const updateReportUserName = async (
  id: string,
  data: UpdateReportUserNameRequest,
): Promise<ApiResponse<Report>> => {
  const response = await apiClient.patch<ApiResponse<Report>>(
    `/rag/report/${id}/user-name`,
    data,
  );
  return response.data;
};
