import MistakeImage from '@/assets/images/mistake.png?format=webp&as=url';
import BaseCard from '@/pages/Report/components/BaseCard';
import type {
  BaseCardProps,
  MistakesContent,
  ParticipantNames,
} from '@/pages/Report/types';
import * as BaseS from '../BaseCard/BaseCard.styles';
import * as S from './MistakesCard.styles';

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
  isActive = true,
}: MistakesCardProps) => {
  return (
    <BaseCard title={title} imageSrc={MistakeImage} isActive={isActive}>
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
      <BaseS.SectionTitle>상세 설명</BaseS.SectionTitle>
      <BaseS.ItemList>
        {content.mistakes.map((mistake) => (
          <BaseS.Item
            key={`${mistake.type}-detail`}
            id={`mistake-${mistake.type}`}
          >
            <BaseS.ItemTitle>{mistake.type}</BaseS.ItemTitle>
            <BaseS.ItemDescription>
              <strong>정의</strong>
              {mistake.definition}
            </BaseS.ItemDescription>
            <BaseS.ItemDescription>
              <strong>근거</strong>
              {mistake.evidence}
            </BaseS.ItemDescription>
          </BaseS.Item>
        ))}
      </BaseS.ItemList>
    </BaseCard>
  );
};

export default MistakesCard;
