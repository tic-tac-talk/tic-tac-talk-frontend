const IMAGE_CONSTANTS = {
  HEIC_QUALITY: 0.9,
  MAX_SIZE_MB: 2,
  MAX_WIDTH_OR_HEIGHT: 1440,
  INITIAL_QUALITY: 0.9,
  FALLBACK_QUALITY: 0.7,
  MIN_QUALITY: 0.5,
} as const;

const convertImageToJpeg = async (file: File): Promise<File> => {
  const [imageCompression, { heicTo }] = await Promise.all([
    import('browser-image-compression').then((m) => m.default),
    import('heic-to/csp'),
  ]);

  let processFile = file;

  if (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.match(/\.(heic|heif)$/i)
  ) {
    try {
      const convertedBlob = await heicTo({
        blob: file,
        type: 'image/jpeg',
        quality: IMAGE_CONSTANTS.HEIC_QUALITY,
      });

      processFile = new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' },
      );
    } catch {
      throw new Error('HEIC 이미지 변환에 실패했습니다.');
    }
  }

  try {
    const options = {
      maxSizeMB: IMAGE_CONSTANTS.MAX_SIZE_MB,
      maxWidthOrHeight: IMAGE_CONSTANTS.MAX_WIDTH_OR_HEIGHT,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: IMAGE_CONSTANTS.INITIAL_QUALITY,
    };

    let compressedFile = await imageCompression(processFile, options);

    const maxSizeBytes = IMAGE_CONSTANTS.MAX_SIZE_MB * 1024 * 1024;
    if (compressedFile.size > maxSizeBytes) {
      compressedFile = await imageCompression(processFile, {
        ...options,
        initialQuality: IMAGE_CONSTANTS.FALLBACK_QUALITY,
      });
    }

    if (compressedFile.size > maxSizeBytes) {
      compressedFile = await imageCompression(processFile, {
        ...options,
        initialQuality: IMAGE_CONSTANTS.MIN_QUALITY,
      });
    }

    return new File(
      [compressedFile],
      processFile.name.replace(/\.[^/.]+$/, '.jpg'),
      {
        type: 'image/jpeg',
        lastModified: Date.now(),
      },
    );
  } catch {
    throw new Error('이미지 압축에 실패했습니다.');
  }
};

export default convertImageToJpeg;
