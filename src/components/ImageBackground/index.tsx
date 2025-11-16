import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

const Background = styled.div<{ imageUrl: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imageUrl}) center center / cover no-repeat;
  z-index: -1;
`;

const Wrapper = styled.div`
  min-height: 100%;
`;

interface ImageBackgroundProps {
  imageUrl: string;
  children: ReactNode;
  onLoaded?: () => void;
}

const ImageBackground = ({
  imageUrl,
  children,
  onLoaded,
}: ImageBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      onLoaded?.();
    };
    img.src = imageUrl;
  }, [imageUrl, onLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Background imageUrl={imageUrl} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default ImageBackground;
