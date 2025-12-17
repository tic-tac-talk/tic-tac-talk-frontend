import ErrorIcon from '@/assets/icons/error.svg?react';
import Button from '@/components/Button';
import * as S from './ErrorFallback.styles';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRetry = () => {
    resetErrorBoundary();
  };

  return (
    <S.Container>
      <S.Card>
        <S.ErrorIconWrapper>
          <ErrorIcon />
        </S.ErrorIconWrapper>
        <S.Title>문제가 발생했습니다</S.Title>
        <S.Description>
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </S.Description>
        <S.ButtonsWrapper>
          <Button onClick={handleGoHome} fullWidth variant="secondary">
            홈으로 이동
          </Button>
          <Button onClick={handleRetry} fullWidth>
            다시 시도
          </Button>
        </S.ButtonsWrapper>
      </S.Card>
    </S.Container>
  );
};

export default ErrorFallback;
