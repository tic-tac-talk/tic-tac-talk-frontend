import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RECORDING_CONSTANTS } from '@/constants';
import { audioConverterService } from '@/services/audioConverter';

vi.mock('@ffmpeg/ffmpeg');
vi.mock('@ffmpeg/util');

interface MockFFmpegInstance {
  load: ReturnType<typeof vi.fn>;
  writeFile: ReturnType<typeof vi.fn>;
  readFile: ReturnType<typeof vi.fn>;
  exec: ReturnType<typeof vi.fn>;
}

describe('AudioConverterService', () => {
  let mockFFmpegInstance: MockFFmpegInstance;

  beforeEach(() => {
    vi.clearAllMocks();

    mockFFmpegInstance = {
      load: vi.fn(),
      writeFile: vi.fn(),
      readFile: vi.fn(),
      exec: vi.fn(),
    };

    vi.mocked(FFmpeg).mockImplementation(
      () => mockFFmpegInstance as unknown as FFmpeg,
    );
    vi.mocked(toBlobURL).mockResolvedValue('blob:mock-url');
    vi.mocked(fetchFile).mockResolvedValue(new Uint8Array([1, 2, 3]));

    (audioConverterService as any).isLoaded = false;
    (audioConverterService as any).ffmpeg = mockFFmpegInstance;
  });

  describe('loadFFmpeg', () => {
    it('올바른 URL로 FFmpeg를 로드한다', async () => {
      await audioConverterService.loadFFmpeg();

      expect(toBlobURL).toHaveBeenCalledWith(
        `${RECORDING_CONSTANTS.FFMPEG_BASE_URL}/ffmpeg-core.js`,
        'text/javascript',
      );
      expect(toBlobURL).toHaveBeenCalledWith(
        `${RECORDING_CONSTANTS.FFMPEG_BASE_URL}/ffmpeg-core.wasm`,
        'application/wasm',
      );
      expect(mockFFmpegInstance.load).toHaveBeenCalledWith({
        coreURL: 'blob:mock-url',
        wasmURL: 'blob:mock-url',
      });
    });

    it('로드 후 isLoaded를 true로 설정한다', async () => {
      expect(audioConverterService.isFFmpegLoaded()).toBe(false);

      await audioConverterService.loadFFmpeg();

      expect(audioConverterService.isFFmpegLoaded()).toBe(true);
    });

    it('이미 로드된 경우 재로드하지 않는다', async () => {
      await audioConverterService.loadFFmpeg();
      expect(mockFFmpegInstance.load).toHaveBeenCalledTimes(1);

      await audioConverterService.loadFFmpeg();
      expect(mockFFmpegInstance.load).toHaveBeenCalledTimes(1);
    });
  });

  describe('convertToMp3', () => {
    it('로드되지 않은 경우 변환 전에 FFmpeg를 로드한다', async () => {
      const mockWebmBlob = new Blob(['webm data'], { type: 'audio/webm' });
      mockFFmpegInstance.readFile.mockResolvedValue(new Uint8Array([4, 5, 6]));

      await audioConverterService.convertToMp3(mockWebmBlob);

      expect(mockFFmpegInstance.load).toHaveBeenCalled();
    });

    it('입력 파일 작성, FFmpeg 실행, 출력 파일 읽기를 수행한다', async () => {
      const mockWebmBlob = new Blob(['webm data'], { type: 'audio/webm' });
      const mockOutputData = new Uint8Array([7, 8, 9]);
      mockFFmpegInstance.readFile.mockResolvedValue(mockOutputData);

      const result = await audioConverterService.convertToMp3(mockWebmBlob);

      expect(fetchFile).toHaveBeenCalledWith(mockWebmBlob);
      expect(mockFFmpegInstance.writeFile).toHaveBeenCalledWith(
        'input.webm',
        new Uint8Array([1, 2, 3]),
      );
      expect(mockFFmpegInstance.exec).toHaveBeenCalledWith([
        '-i',
        'input.webm',
        '-acodec',
        'mp3',
        '-ab',
        RECORDING_CONSTANTS.AUDIO_BITRATE,
        'output.mp3',
      ]);
      expect(mockFFmpegInstance.readFile).toHaveBeenCalledWith('output.mp3');
      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('audio/mp3');
    });
  });
});
