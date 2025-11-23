import React from 'react';
import { useAtom } from 'jotai';
import {
  modalsAtom,
  openModalAtom,
  closeModalAtom,
  closeAllModalsAtom,
  type ModalState,
} from '@/atoms/modalAtom';
import { MODAL_CONSTANTS } from '@/constants';

interface UseModalReturn {
  modals: ModalState[];
  openModal: (modalConfig: Omit<ModalState, 'isOpen'>) => void;
  closeModal: (targetId: string) => void;
  closeAllModals: () => void;
  confirm: (config: {
    title: string;
    content: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    id?: string;
  }) => void;
  alert: (config: {
    title: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    id?: string;
  }) => void;
  loading: (config?: {
    loadingText?: string;
    disableBackdropClick?: boolean;
    id?: string;
  }) => void;
  custom: (config: {
    id?: string;
    component: React.ReactNode;
    disableBackdropClick?: boolean;
  }) => void;
  toast: (config: {
    content: React.ReactNode;
    duration?: number;
    id?: string;
  }) => void;
}

const useModal = (): UseModalReturn => {
  const [modals] = useAtom(modalsAtom);
  const [, setOpenModal] = useAtom(openModalAtom);
  const [, setCloseModal] = useAtom(closeModalAtom);
  const [, setCloseAllModals] = useAtom(closeAllModalsAtom);

  const openModal = (modalConfig: Omit<ModalState, 'isOpen'>): void => {
    setOpenModal(modalConfig);
  };

  const closeModal = (targetId: string): void => {
    setCloseModal(targetId);
  };

  const closeAllModals = (): void => {
    setCloseAllModals();
  };

  const confirm = (config: {
    title: string;
    content: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    id?: string;
  }): void => {
    openModal({
      id: config.id || `confirm-modal-${Date.now()}`,
      type: 'confirm',
      title: config.title,
      content: config.content,
      onConfirm: config.onConfirm,
      confirmText: config.confirmText || '확인',
      cancelText: config.cancelText || '취소',
    });
  };

  const alert = (config: {
    title: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    id?: string;
  }): void => {
    openModal({
      id: config.id || `alert-modal-${Date.now()}`,
      type: 'alert',
      title: config.title,
      content: config.content,
      onConfirm: config.onConfirm,
      confirmText: config.confirmText || '확인',
    });
  };

  const loading = (
    config: {
      loadingText?: string;
      disableBackdropClick?: boolean;
      id?: string;
    } = {},
  ): void => {
    openModal({
      id: config.id || 'loading-modal',
      type: 'loading',
      loadingText: config.loadingText,
      disableBackdropClick: config.disableBackdropClick,
    });
  };

  const custom = (config: {
    id?: string;
    component: React.ReactNode;
    disableBackdropClick?: boolean;
  }): void => {
    openModal({
      id: config.id || `custom-modal-${Date.now()}`,
      type: 'custom',
      customComponent: config.component,
      disableBackdropClick: config.disableBackdropClick,
    });
  };

  const toast = (config: {
    content: React.ReactNode;
    duration?: number;
    id?: string;
  }): void => {
    openModal({
      id: config.id || `toast-${Date.now()}`,
      type: 'toast',
      content: config.content,
      duration: config.duration || MODAL_CONSTANTS.DEFAULT_TOAST_DURATION_MS,
      disableBackdropClick: true,
    });
  };

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    confirm,
    alert,
    loading,
    custom,
    toast,
  };
};

export default useModal;
export type { UseModalReturn };
