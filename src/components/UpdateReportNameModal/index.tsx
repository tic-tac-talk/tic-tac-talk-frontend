import React, { useState } from 'react';
import { updateReportUserName } from '@/apis/report/reportApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useModal from '@/hooks/useModal';
import type { ChatMessage } from '@/types/api';
import * as S from './UpdateReportNameModal.styles';

interface UpdateReportNameModalProps {
  reportId: string;
  chatData: ChatMessage[];
  onClose: () => void;
  onSuccess: () => void;
}

interface SpeakerSelectionProps {
  chatData: ChatMessage[];
  onNext: (selectedSpeaker: 'A' | 'B') => void;
}

const SpeakerSelection = ({ chatData, onNext }: SpeakerSelectionProps) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<'A' | 'B' | null>(
    null,
  );

  const speakerAMessages = chatData
    .filter((msg) => msg.name === 'A')
    .map((msg) => msg.message)
    .sort((a, b) => b.length - a.length)
    .slice(0, 3);

  const speakerBMessages = chatData
    .filter((msg) => msg.name === 'B')
    .map((msg) => msg.message)
    .sort((a, b) => b.length - a.length)
    .slice(0, 3);

  const handleSubmit = () => {
    if (selectedSpeaker) {
      onNext(selectedSpeaker);
    }
  };

  return (
    <S.Container>
      <S.Title>어떤 대화가 본인의 대화인가요?</S.Title>
      <S.Description>본인이 말한 대화 내용을 선택해 주세요</S.Description>
      <S.SpeakerOptionsContainer>
        <S.SpeakerOption
          type="button"
          isSelected={selectedSpeaker === 'A'}
          onClick={() => setSelectedSpeaker('A')}
        >
          <S.SpeakerLabel>화자 A</S.SpeakerLabel>
          <S.MessageList>
            {speakerAMessages.map((msg) => (
              <S.Message key={msg.substring(0, 20)}>{msg}</S.Message>
            ))}
          </S.MessageList>
        </S.SpeakerOption>
        <S.SpeakerOption
          type="button"
          isSelected={selectedSpeaker === 'B'}
          onClick={() => setSelectedSpeaker('B')}
        >
          <S.SpeakerLabel>화자 B</S.SpeakerLabel>
          <S.MessageList>
            {speakerBMessages.map((msg) => (
              <S.Message key={msg.substring(0, 20)}>{msg}</S.Message>
            ))}
          </S.MessageList>
        </S.SpeakerOption>
      </S.SpeakerOptionsContainer>
      <Button fullWidth disabled={!selectedSpeaker} onClick={handleSubmit}>
        다음
      </Button>
    </S.Container>
  );
};

interface NameInputProps {
  onSubmit: (otherUserName: string) => void;
  onBack: () => void;
}

const NameInput = ({ onSubmit, onBack }: NameInputProps) => {
  const [otherUserName, setOtherUserName] = useState('');
  const { alert } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otherUserName.trim()) {
      alert({
        title: '이름 입력 필요',
        content: '대화 상대의 이름을 입력해 주세요.',
      });
      return;
    }

    onSubmit(otherUserName.trim());
  };

  return (
    <S.Container>
      <S.Title>상대 이름은 무엇인가요?</S.Title>
      <S.Description>레포트에 표시될 상대의 이름을 입력해 주세요</S.Description>
      <S.Form onSubmit={handleSubmit}>
        <S.InputSection>
          <Input
            id="otherUserName"
            label="상대 이름"
            type="text"
            value={otherUserName}
            onChange={(e) => setOtherUserName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </S.InputSection>
        <S.ButtonsWrapper>
          <Button variant="secondary" fullWidth onClick={onBack}>
            이전
          </Button>
          <Button type="submit" fullWidth>
            완료
          </Button>
        </S.ButtonsWrapper>
      </S.Form>
    </S.Container>
  );
};

const UpdateReportNameModal = ({
  reportId,
  chatData,
  onClose,
  onSuccess,
}: UpdateReportNameModalProps) => {
  const [step, setStep] = useState<'speaker' | 'name'>('speaker');
  const [selectedSpeaker, setSelectedSpeaker] = useState<'A' | 'B' | null>(
    null,
  );
  const { alert, loading, closeModal } = useModal();

  const handleSpeakerSelect = (speaker: 'A' | 'B') => {
    setSelectedSpeaker(speaker);
    setStep('name');
  };

  const handleBack = () => {
    setStep('speaker');
  };

  const handleNameSubmit = async (otherUserName: string) => {
    if (!selectedSpeaker) return;

    try {
      loading({
        loadingText: '정보를 업데이트하고 있어요',
        disableBackdropClick: true,
      });

      await updateReportUserName(reportId, {
        selectedSpeaker,
        otherUserName,
      });

      closeModal('loading-modal');
      onClose();
      onSuccess();
    } catch {
      closeModal('loading-modal');
      alert({
        title: '업데이트 실패',
        content: '이름 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  return (
    <>
      {step === 'speaker' && (
        <SpeakerSelection chatData={chatData} onNext={handleSpeakerSelect} />
      )}
      {step === 'name' && (
        <NameInput onSubmit={handleNameSubmit} onBack={handleBack} />
      )}
    </>
  );
};

export default UpdateReportNameModal;
