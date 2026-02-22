import imageCompression from 'browser-image-compression';
import { heicTo } from 'heic-to/csp';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import convertImageToJpeg from '@/utils/convertImageToJpeg';

vi.mock('browser-image-compression');
vi.mock('heic-to/csp');

describe('convertImageToJpeg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('HEIC/HEIF 변환', () => {
    it.each([
      ['HEIC', 'test.heic', 'image/heic'],
      ['HEIF', 'test.heif', 'image/heif'],
      ['대문자 HEIC', 'test.HEIC', 'image/jpeg'],
    ])('%s 파일을 JPEG로 변환한다', async (_description, filename, type) => {
      const mockBlob = new Blob(['heic data'], { type });
      const mockJpegBlob = new Blob(['jpeg data'], { type: 'image/jpeg' });
      const heicFile = new File([mockBlob], filename, { type });

      vi.mocked(heicTo).mockResolvedValue(mockJpegBlob);
      vi.mocked(imageCompression).mockResolvedValue(
        new File([mockJpegBlob], 'test.jpg', { type: 'image/jpeg' }),
      );

      const result = await convertImageToJpeg(heicFile);

      expect(heicTo).toHaveBeenCalled();
      expect(result.type).toBe('image/jpeg');
      expect(result.name).toBe('test.jpg');
    });

    it('HEIC 변환 실패 시 에러를 발생시킨다', async () => {
      const heicFile = new File(['heic data'], 'test.heic', {
        type: 'image/heic',
      });

      vi.mocked(heicTo).mockRejectedValue(new Error('Conversion failed'));

      await expect(convertImageToJpeg(heicFile)).rejects.toThrow(
        'HEIC 이미지 변환에 실패했습니다.',
      );
    });
  });

  describe('이미지 압축', () => {
    it('일반 이미지 파일을 압축한다', async () => {
      const mockImageBlob = new Blob(['image data'], { type: 'image/png' });
      const mockCompressedBlob = new Blob(['compressed data'], {
        type: 'image/jpeg',
      });
      const imageFile = new File([mockImageBlob], 'test.png', {
        type: 'image/png',
      });

      vi.mocked(imageCompression).mockResolvedValue(
        new File([mockCompressedBlob], 'test.jpg', { type: 'image/jpeg' }),
      );

      const result = await convertImageToJpeg(imageFile);

      expect(imageCompression).toHaveBeenCalledWith(imageFile, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1440,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.9,
      });
      expect(result.type).toBe('image/jpeg');
    });

    it('크기 제한 초과 시 품질을 낮춰 재압축한다', async () => {
      const mockImageBlob = new Blob(['image data'], { type: 'image/png' });
      const largeMockBlob = new Blob(['a'.repeat(3 * 1024 * 1024)], {
        type: 'image/jpeg',
      });
      const smallMockBlob = new Blob(['compressed data'], {
        type: 'image/jpeg',
      });
      const imageFile = new File([mockImageBlob], 'test.png', {
        type: 'image/png',
      });

      vi.mocked(imageCompression)
        .mockResolvedValueOnce(
          new File([largeMockBlob], 'test.jpg', { type: 'image/jpeg' }),
        )
        .mockResolvedValueOnce(
          new File([smallMockBlob], 'test.jpg', { type: 'image/jpeg' }),
        );

      await convertImageToJpeg(imageFile);

      expect(imageCompression).toHaveBeenCalledTimes(2);
      expect(imageCompression).toHaveBeenNthCalledWith(2, imageFile, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1440,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.7,
      });
    });

    it('압축 실패 시 에러를 발생시킨다', async () => {
      const imageFile = new File(['image data'], 'test.png', {
        type: 'image/png',
      });

      vi.mocked(imageCompression).mockRejectedValue(
        new Error('Compression failed'),
      );

      await expect(convertImageToJpeg(imageFile)).rejects.toThrow(
        '이미지 압축에 실패했습니다.',
      );
    });
  });
});
