export const RECORDING_CONSTANTS = {
  MAX_RECORDING_TIME_SECONDS: 900,
  VOLUME_UPDATE_INTERVAL_MS: 30,
  FFT_SIZE: 256,
  FFMPEG_BASE_URL: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm',
  AUDIO_BITRATE: '128k',
} as const;
