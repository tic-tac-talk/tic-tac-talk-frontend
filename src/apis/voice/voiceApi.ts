import apiClient from '@/apis/core/apiClient';
import type {
  VoiceTranscribeRequest,
  VoiceTranscribeResponse,
} from '@/types/api';

export const transcribeVoice = async (
  data: VoiceTranscribeRequest,
): Promise<VoiceTranscribeResponse> => {
  const formData = new FormData();

  formData.append('userdata', JSON.stringify(data.userdata));
  formData.append('file', data.file, 'recording.mp3');

  const response = await apiClient.post<VoiceTranscribeResponse>(
    '/voice/transcribe',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
