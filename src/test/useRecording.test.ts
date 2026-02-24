import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RECORDING_CONSTANTS } from '@/constants';
import useRecording from '@/pages/Recording/hooks/useRecording';
import { audioConverterService } from '@/services/audioConverter';

vi.mock('@/services/audioConverter', () => ({
  audioConverterService: {
    convertToMp3: vi.fn(),
  },
}));

class MockMediaRecorder extends EventTarget {
  state = 'inactive';

  set ondataavailable(fn: ((e: BlobEvent) => void) | null) {
    if (fn) this.addEventListener('dataavailable', fn as EventListener);
  }

  set onstop(fn: ((e: Event) => void) | null) {
    if (fn) this.addEventListener('stop', fn as EventListener);
  }

  start = vi.fn(function (this: MockMediaRecorder) {
    this.state = 'recording';
  });

  stop = vi.fn(function (this: MockMediaRecorder) {
    this.state = 'inactive';
    setTimeout(() => this.dispatchEvent(new Event('stop')), 0);
  });
}

class MockAudio extends EventTarget {
  currentTime = 0;

  set onplay(fn: (() => void) | null) {
    if (fn) this.addEventListener('play', fn as EventListener);
  }

  set onended(fn: ((e: Event) => void) | null) {
    if (fn) this.addEventListener('ended', fn as EventListener);
  }

  set onerror(fn: ((e: Event) => void) | null) {
    if (fn) this.addEventListener('error', fn as EventListener);
  }

  play = vi.fn(async function (this: MockAudio) {
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  });

  pause = vi.fn();
}

describe('useRecording', () => {
  let mockMediaRecorder: MockMediaRecorder;
  let mockAnalyser: {
    frequencyBinCount: number;
    getByteFrequencyData: ReturnType<typeof vi.fn>;
  };
  let mockAudioContext: {
    createAnalyser: ReturnType<typeof vi.fn>;
    createMediaStreamSource: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };
  let mockAudio: MockAudio;

  beforeEach(() => {
    vi.useFakeTimers();

    mockAnalyser = {
      frequencyBinCount: 1024,
      getByteFrequencyData: vi.fn((array: Uint8Array) => {
        array.fill(128);
      }),
    };

    const mockSource = { connect: vi.fn() };

    mockAudioContext = {
      createAnalyser: vi.fn(() => mockAnalyser),
      createMediaStreamSource: vi.fn(() => mockSource),
      close: vi.fn(),
    };

    mockMediaRecorder = new MockMediaRecorder();
    mockAudio = new MockAudio();

    global.AudioContext = vi.fn(
      () => mockAudioContext,
    ) as unknown as typeof AudioContext;
    global.MediaRecorder = vi.fn(
      () => mockMediaRecorder,
    ) as unknown as typeof MediaRecorder;
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: vi.fn(async () => ({
          getTracks: vi.fn(() => [{ stop: vi.fn(), kind: 'audio' }]),
        })),
      },
    });
    global.Audio = vi.fn(() => mockAudio) as unknown as typeof Audio;
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();

    vi.mocked(audioConverterService.convertToMp3).mockResolvedValue(
      new Blob(['mock mp3'], { type: 'audio/mp3' }),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  const setupRecordingBlob = async (result: {
    current: ReturnType<typeof useRecording>;
  }) => {
    await act(async () => {
      result.current.toggleRecording();
    });
    mockMediaRecorder.dispatchEvent(
      new BlobEvent('dataavailable', {
        data: new Blob(['audio data'], { type: 'audio/webm' }),
      }),
    );
    await act(async () => {
      result.current.toggleRecording();
    });
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  };

  const setupPlayingState = async (result: {
    current: ReturnType<typeof useRecording>;
  }) => {
    await setupRecordingBlob(result);
    await act(async () => {
      result.current.playRecording();
    });
  };

  describe('초기 상태', () => {
    it('올바른 초기값을 반환한다', () => {
      const { result } = renderHook(() => useRecording());

      expect(result.current.status).toBe('idle');
      expect(result.current.isRecording).toBe(false);
      expect(result.current.isConverting).toBe(false);
      expect(result.current.recordingTime).toBe(0);
      expect(result.current.volume).toBe(0);
      expect(result.current.audioBlob).toBeNull();
      expect(result.current.recordingError).toBe(false);
      expect(result.current.isPlaying).toBe(false);
    });
  });

  describe('녹음 시작', () => {
    it('녹음을 성공적으로 시작한다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      expect(result.current.status).toBe('recording');
    });

    it('getUserMedia 실패 시 에러 상태를 설정한다', async () => {
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(
        new Error('Permission denied'),
      );
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      expect(result.current.recordingError).toBe(true);
      expect(result.current.status).toBe('idle');
    });

    it('매초마다 녹음 시간을 증가시킨다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.recordingTime).toBe(1);
    });

    it('주기적으로 볼륨을 업데이트한다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      await act(async () => {
        vi.advanceTimersByTime(RECORDING_CONSTANTS.VOLUME_UPDATE_INTERVAL_MS);
      });

      expect(result.current.volume).toBeGreaterThan(0);
    });

    it('최대 녹음 시간에 도달하면 녹음을 중지한다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      await act(async () => {
        vi.advanceTimersByTime(
          (RECORDING_CONSTANTS.MAX_RECORDING_TIME_SECONDS + 1) * 1000,
        );
      });

      expect(result.current.recordingTime).toBe(
        RECORDING_CONSTANTS.MAX_RECORDING_TIME_SECONDS,
      );
      expect(result.current.status).toBe('converting');
    });
  });

  describe('녹음 중지', () => {
    it('녹음을 중지하고 오디오를 변환한다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });

      await act(async () => {
        mockMediaRecorder.dispatchEvent(
          new BlobEvent('dataavailable', {
            data: new Blob(['audio data'], { type: 'audio/webm' }),
          }),
        );
        result.current.toggleRecording();
      });

      expect(result.current.status).toBe('converting');

      await act(async () => {
        await vi.runAllTimersAsync();
      });

      expect(audioConverterService.convertToMp3).toHaveBeenCalled();
      expect(result.current.status).toBe('idle');
      expect(result.current.audioBlob).not.toBeNull();
    });

    it('녹음 중지 후 볼륨이 초기화된다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });
      await act(async () => {
        vi.advanceTimersByTime(RECORDING_CONSTANTS.VOLUME_UPDATE_INTERVAL_MS);
      });
      expect(result.current.volume).toBeGreaterThan(0);

      await act(async () => {
        result.current.toggleRecording();
      });

      expect(result.current.volume).toBe(0);
    });

    it('변환 에러가 발생하면 에러 상태를 설정한다', async () => {
      vi.mocked(audioConverterService.convertToMp3).mockRejectedValue(
        new Error('Conversion failed'),
      );
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });
      await act(async () => {
        result.current.toggleRecording();
      });
      await act(async () => {
        await vi.runAllTimersAsync();
      });

      expect(result.current.status).toBe('idle');
      expect(result.current.recordingError).toBe(true);
      expect(result.current.audioBlob).toBeNull();
    });

    it('변환 중일 때는 아무 작업도 하지 않는다', async () => {
      const { result } = renderHook(() => useRecording());

      await act(async () => {
        result.current.toggleRecording();
      });
      await act(async () => {
        result.current.toggleRecording();
      });
      await act(async () => {
        result.current.toggleRecording();
      });

      expect(result.current.status).toBe('converting');
    });
  });

  describe('녹음 재생', () => {
    it('오디오 블롭이 없으면 재생하지 않는다', () => {
      const { result } = renderHook(() => useRecording());

      act(() => {
        result.current.playRecording();
      });

      expect(result.current.isPlaying).toBe(false);
    });

    it('오디오 블롭이 있으면 오디오를 재생한다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupRecordingBlob(result);

      await act(async () => {
        result.current.playRecording();
      });

      expect(URL.createObjectURL).toHaveBeenCalledWith(
        result.current.audioBlob,
      );
      expect(mockAudio.play).toHaveBeenCalled();
      expect(result.current.isPlaying).toBe(true);
    });

    it('이미 재생 중일 때는 재생하지 않는다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupPlayingState(result);

      await act(async () => {
        result.current.playRecording();
      });

      expect(result.current.isPlaying).toBe(true);
    });

    it('오디오 종료 이벤트를 처리한다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupPlayingState(result);

      act(() => {
        mockAudio.dispatchEvent(new Event('ended'));
      });

      expect(result.current.isPlaying).toBe(false);
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('오디오 에러가 발생하면 재생을 중지한다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupPlayingState(result);

      act(() => {
        mockAudio.dispatchEvent(new Event('error'));
      });

      expect(result.current.isPlaying).toBe(false);
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('재생 중지', () => {
    it('오디오 재생을 중지한다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupPlayingState(result);

      act(() => {
        result.current.stopPlayback();
      });

      expect(mockAudio.pause).toHaveBeenCalled();
      expect(result.current.isPlaying).toBe(false);
    });
  });

  describe('녹음 다운로드', () => {
    it('오디오 파일을 다운로드한다', async () => {
      const { result } = renderHook(() => useRecording());
      await setupRecordingBlob(result);

      act(() => {
        result.current.downloadRecording();
      });

      expect(URL.createObjectURL).toHaveBeenCalledWith(
        result.current.audioBlob,
      );
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('오디오 블롭이 없으면 다운로드하지 않는다', () => {
      const { result } = renderHook(() => useRecording());

      act(() => {
        result.current.downloadRecording();
      });

      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });
  });
});
