import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { transcribeVoice } from '@/apis/voice/voiceApi';
import { userAtom } from '@/atoms/userAtom';
import useModal from '@/hooks/useModal';
import RecordingContent from '@/pages/Recording/components/RecordingContent';
import useRecording from '@/pages/Recording/hooks/useRecording';

const Recording = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { loading, closeModal, toast } = useModal();
  const user = useAtomValue(userAtom);

  const {
    status,
    recordingTime,
    volume,
    audioBlob,
    recordingError,
    toggleRecording,
  } = useRecording();

  const { mutate: transcribe } = useMutation({
    mutationFn: transcribeVoice,
  });

  useEffect(() => {
    if (audioBlob && !isProcessing && user) {
      setIsProcessing(true);

      loading({
        loadingText: '녹음된 음성을 변환하고 있어요',
        disableBackdropClick: true,
      });

      transcribe(
        { file: audioBlob },
        {
          onSuccess: () => {
            closeModal('loading-modal');
            toast({
              content:
                '녹음이 완료됐어요. 분석이 끝나면 레포트를 확인할 수 있어요.',
            });
            queryClient.invalidateQueries();
            navigate('/');
          },
          onError: () => {
            closeModal('loading-modal');
            queryClient.invalidateQueries();
            navigate('/');
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob, isProcessing, user]);

  return (
    <RecordingContent
      isRecording={status === 'recording'}
      recordingTime={recordingTime}
      volume={volume}
      recordingError={recordingError}
      onToggleRecording={toggleRecording}
    />
  );
};

export default Recording;
