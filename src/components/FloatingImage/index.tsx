import * as S from '@/components/FloatingImage/FloatingImage.styles';

interface FloatingImageProps {
  src: string;
  height?: number;
  highFetchPriority?: boolean;
}

const FloatingImage = ({
  src,
  height = 108,
  highFetchPriority = false,
}: FloatingImageProps) => {
  return (
    <S.Container height={height}>
      <S.Image src={src} fetchPriority={highFetchPriority ? 'high' : 'auto'} />
    </S.Container>
  );
};

export default FloatingImage;
