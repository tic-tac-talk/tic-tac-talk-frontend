import * as S from '@/components/FloatingImage/FloatingImage.styles';

interface FloatingImageProps {
  src: string;
  height?: number;
}

const FloatingImage = ({ src, height = 108 }: FloatingImageProps) => {
  return (
    <S.Container height={height}>
      <S.Image src={src} />
    </S.Container>
  );
};

export default FloatingImage;
