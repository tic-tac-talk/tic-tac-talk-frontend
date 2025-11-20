import apiClient from '@/apis/core/apiClient';
import type {
  ApiResponse,
  UserProfile,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from '@/types/api';

export const reissueToken = async (): Promise<ApiResponse<string>> => {
  const response = await apiClient.post<ApiResponse<string>>(
    '/security/jwt/reissue',
  );
  return response.data;
};

export const logout = async (): Promise<ApiResponse<string>> => {
  const response =
    await apiClient.post<ApiResponse<string>>('/security/logout');
  return response.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(
    '/security/user/profile',
  );
  return response.data.data;
};

export const updateUserInfo = async (
  data: UpdateUserInfoRequest,
): Promise<UpdateUserInfoResponse> => {
  const formData = new FormData();

  if (data.nickname !== undefined) {
    formData.append('nickname', data.nickname);
  }
  if (data.image) {
    formData.append('image', data.image);
  }

  formData.append('isProfileImageDeleted', String(data.isProfileImageDeleted));

  const response = await apiClient.put<ApiResponse<UpdateUserInfoResponse>>(
    '/security/user/additional-info',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.data;
};
