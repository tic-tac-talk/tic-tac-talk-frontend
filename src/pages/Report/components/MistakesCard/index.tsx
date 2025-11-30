import MistakeImage from '@/assets/images/mistake.png';
import BaseCard from '@/pages/Report/components/BaseCard';
import type {
  BaseCardProps,
  MistakesContent,
  ParticipantNames,
} from '@/pages/Report/types';
import * as S from '../BaseCard.styles';

interface MistakesCardProps extends BaseCardProps {
  content: MistakesContent;
  participantNames: ParticipantNames;
}

const getSeverityLabel = (severity: 'low' | 'medium' | 'high') => {
  const labels = { low: '낮음', medium: '보통', high: '높음' };
  return labels[severity];
};

const MistakesCard = ({
  title,
  content,
  participantNames,
  hasBeenActivated = false,
  isActive = true,
}: MistakesCardProps) => {
  return (
    <BaseCard
      title={title}
      imageSrc={MistakeImage}
      hasBeenActivated={hasBeenActivated}
      isActive={isActive}
    >
      <S.Table>
        <thead>
          <S.TableRow>
            <S.TableHeader>유형</S.TableHeader>
            <S.TableHeader>{participantNames.A}</S.TableHeader>
            <S.TableHeader>{participantNames.B}</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {content.mistakes.map((mistake, index) => (
            <S.TableRow
              key={`${mistake.type}-${mistake.definition}`}
              isEven={index % 2 === 0}
            >
              <S.TableCell>
                <a
                  href={`#mistake-${mistake.type}`}
                  style={{ color: 'inherit' }}
                >
                  {mistake.type}
                </a>
              </S.TableCell>
              <S.TableCell>
                {mistake.participantA && (
                  <S.SeverityBadge severity={mistake.severity}>
                    {getSeverityLabel(mistake.severity)}
                  </S.SeverityBadge>
                )}
              </S.TableCell>
              <S.TableCell>
                {mistake.participantB && (
                  <S.SeverityBadge severity={mistake.severity}>
                    {getSeverityLabel(mistake.severity)}
                  </S.SeverityBadge>
                )}
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      <S.SectionTitle>상세 설명</S.SectionTitle>
      <S.ItemList>
        {content.mistakes.map((mistake) => (
          <S.Item key={`${mistake.type}-detail`} id={`mistake-${mistake.type}`}>
            <S.ItemTitle>{mistake.type}</S.ItemTitle>
            <S.ItemDescription>
              <strong>정의</strong>
              {mistake.definition}
            </S.ItemDescription>
            <S.ItemDescription>
              <strong>근거</strong>
              {mistake.evidence}
            </S.ItemDescription>
          </S.Item>
        ))}
      </S.ItemList>
    </BaseCard>
  );
};

export default MistakesCard;
