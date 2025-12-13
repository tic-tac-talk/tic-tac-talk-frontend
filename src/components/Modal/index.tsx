import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import type { ModalState } from '@/atoms/modalAtom';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import * as S from '@/components/Modal/Modal.styles';
import useModal from '@/hooks/useModal';
import { lockScroll, unlockScroll } from '@/utils/scrollLock';

interface SingleModalProps {
  modal: ModalState;
  onClose: () => void;
}

const SingleModal = ({ modal, onClose }: SingleModalProps) => {
  const handleClose = () => {
    modal.onClose?.();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !modal.disableBackdropClick) {
      handleClose();
    }
  };

  const handleConfirm = () => {
    modal.onConfirm?.();
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.isOpen && modal.type !== 'toast') {
        handleClose();
      }
    };

    if (modal.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modal.isOpen, modal.type]);

  const hasTitle = Boolean(modal.title);

  const renderContent = () => {
    if (modal.loadingText !== undefined) {
      return (
        <S.LoadingContent>
          <Loader />
          {modal.loadingText && (
            <S.LoadingText>{modal.loadingText}</S.LoadingText>
          )}
        </S.LoadingContent>
      );
    }
    return modal.content;
  };

  const isLoadingModal = modal.loadingText !== undefined;

  if (modal.type === 'toast') {
    return (
      <S.ToastContainer isClosing={!modal.isOpen}>
        <S.ToastContent onClick={handleClose}>{modal.content}</S.ToastContent>
      </S.ToastContainer>
    );
  }

  if (modal.type === 'custom') {
    return (
      <S.Backdrop onClick={handleBackdropClick}>
        <S.CustomModalContainer onClick={(e) => e.stopPropagation()}>
          {modal.customComponent}
        </S.CustomModalContainer>
      </S.Backdrop>
    );
  }

  return (
    <S.Backdrop onClick={handleBackdropClick}>
      {isLoadingModal ? (
        renderContent()
      ) : (
        <S.Container onClick={(e) => e.stopPropagation()}>
          {hasTitle && (
            <S.ModalHeader hasTitle={hasTitle}>
              <S.ModalTitle>{modal.title}</S.ModalTitle>
            </S.ModalHeader>
          )}
          <S.ModalContent hasHeader={hasTitle}>
            {renderContent()}
          </S.ModalContent>
          {(modal.onConfirm || modal.confirmText) && (
            <S.ModalFooter>
              {modal.cancelText && (
                <S.FooterButtonWrapper>
                  <Button variant="secondary" onClick={handleClose} fullWidth>
                    {modal.cancelText}
                  </Button>
                </S.FooterButtonWrapper>
              )}
              <S.FooterButtonWrapper>
                <Button variant="primary" onClick={handleConfirm} fullWidth>
                  {modal.confirmText || '확인'}
                </Button>
              </S.FooterButtonWrapper>
            </S.ModalFooter>
          )}
        </S.Container>
      )}
    </S.Backdrop>
  );
};

const Modal = () => {
  const { modals, closeModal, closeAllModals } = useModal();
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  const hasNonToastModal = modals.some((m) => m.isOpen && m.type !== 'toast');

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      closeAllModals();
    }
    prevPathname.current = location.pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (hasNonToastModal) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [hasNonToastModal]);

  const toasts = modals.filter((m) => m.type === 'toast' && m.isOpen);
  const regularModals = modals.filter((m) => m.type !== 'toast' && m.isOpen);

  if (modals.length === 0 || !modals.some((m) => m.isOpen)) return null;

  return createPortal(
    <>
      {regularModals.map((modal) => (
        <SingleModal
          key={modal.id}
          modal={modal}
          onClose={() => closeModal(modal.id)}
        />
      ))}
      {toasts.length > 0 && (
        <S.ToastsWrapper>
          {toasts.map((toast) => (
            <SingleModal
              key={toast.id}
              modal={toast}
              onClose={() => closeModal(toast.id)}
            />
          ))}
        </S.ToastsWrapper>
      )}
    </>,
    document.body,
  );
};

export default Modal;
