export interface UserProfile {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}

export interface UpdateUserInfoRequest {
  nickname?: string;
  image?: File | Blob;
  isProfileImageDeleted: boolean;
}

export interface UpdateUserInfoResponse {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}
