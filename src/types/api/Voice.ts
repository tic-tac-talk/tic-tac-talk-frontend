export interface VoiceTranscribeRequest {
  file: File | Blob;
  userdata?: Record<string, unknown>;
}

export interface VoiceTranscribeResponse {
  reportId: string;
}
