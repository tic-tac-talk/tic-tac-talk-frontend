import { createPortal } from 'react-dom';
import Loader from '@/components/Loader';
import * as S from './PageLoader.styles';

const PageLoader = () => {
  return createPortal(
    <S.Backdrop>
      <S.LoadingContent>
        <Loader />
        <S.LoadingText>페이지를 불러오고 있어요</S.LoadingText>
      </S.LoadingContent>
    </S.Backdrop>,
    document.body,
  );
};

export default PageLoader;
