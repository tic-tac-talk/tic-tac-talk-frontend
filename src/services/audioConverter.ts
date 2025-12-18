import { RECORDING_CONSTANTS } from '@/constants';
import type { FFmpeg } from '@ffmpeg/ffmpeg';

class AudioConverterService {
  private ffmpeg: FFmpeg | null = null;
  private isLoaded = false;

  async loadFFmpeg(): Promise<void> {
    if (this.isLoaded) return;

    const [{ FFmpeg }, { toBlobURL }] = await Promise.all([
      import('@ffmpeg/ffmpeg'),
      import('@ffmpeg/util'),
    ]);

    this.ffmpeg = new FFmpeg();

    const baseURL = RECORDING_CONSTANTS.FFMPEG_BASE_URL;

    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
    });

    this.isLoaded = true;
  }

  async convertToMp3(webmBlob: Blob): Promise<Blob> {
    if (!this.isLoaded || !this.ffmpeg) {
      await this.loadFFmpeg();
    }

    const { fetchFile } = await import('@ffmpeg/util');

    await this.ffmpeg!.writeFile('input.webm', await fetchFile(webmBlob));
    await this.ffmpeg!.exec([
      '-i',
      'input.webm',
      '-acodec',
      'mp3',
      '-ab',
      RECORDING_CONSTANTS.AUDIO_BITRATE,
      'output.mp3',
    ]);

    const data = await this.ffmpeg!.readFile('output.mp3');
    return new Blob([data as Uint8Array], { type: 'audio/mp3' });
  }

  isFFmpegLoaded(): boolean {
    return this.isLoaded;
  }
}

export const audioConverterService = new AudioConverterService();
