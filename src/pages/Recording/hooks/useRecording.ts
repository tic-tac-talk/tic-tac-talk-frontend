import { useState, useRef } from 'react';
import { RECORDING_CONSTANTS } from '@/constants';
import type { RecordingStatus } from '@/pages/Recording/types/RecordingStatus';
import { audioConverterService } from '@/services/audioConverter';

const useRecording = () => {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingError, setRecordingError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const calculateAverageVolume = (
    dataArray: Uint8Array,
    bufferLength: number,
  ) => {
    let total = 0;
    for (let i = 0; i < bufferLength; i += 1) {
      total += dataArray[i];
    }
    return total / bufferLength;
  };

  const updateVolume = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      const vol = calculateAverageVolume(dataArray, bufferLength);
      setVolume(Math.floor((vol / 256) * 100));
    }
  };

  const stopRecording = () => {
    setStatus('converting');
    setVolume(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = RECORDING_CONSTANTS.FFT_SIZE;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const webmBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          });
          const mp3Blob = await audioConverterService.convertToMp3(webmBlob);

          setAudioBlob(mp3Blob);
          setStatus('idle');
        } catch {
          setStatus('idle');
          setRecordingError(true);
        }
      };

      mediaRecorder.start();
      setStatus('recording');
      setRecordingTime(0);
      setAudioBlob(null);
      setRecordingError(false);

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= RECORDING_CONSTANTS.MAX_RECORDING_TIME_SECONDS) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      volumeIntervalRef.current = setInterval(
        updateVolume,
        RECORDING_CONSTANTS.VOLUME_UPDATE_INTERVAL_MS,
      );
    } catch {
      setRecordingError(true);
    }
  };

  const toggleRecording = () => {
    if (status === 'recording') {
      stopRecording();
    } else if (status === 'idle') {
      startRecording();
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.play().catch(() => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      });
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `녹음_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return {
    status,
    isRecording: status === 'recording',
    isConverting: status === 'converting',
    recordingTime,
    volume,
    audioBlob,
    recordingError,
    isPlaying,
    toggleRecording,
    playRecording,
    stopPlayback,
    downloadRecording,
  };
};

export default useRecording;
