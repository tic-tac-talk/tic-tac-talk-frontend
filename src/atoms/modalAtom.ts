import React from 'react';
import { atom } from 'jotai';
import { MODAL_CONSTANTS } from '@/constants';

export interface ModalState {
  id: string;
  isOpen: boolean;
  type?: 'default' | 'loading' | 'confirm' | 'alert' | 'custom' | 'toast';
  title?: string;
  content?: React.ReactNode;
  loadingText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  disableBackdropClick?: boolean;
  customComponent?: React.ReactNode;
  duration?: number;
}

export const modalsAtom = atom<ModalState[]>([]);

export const closeModalAtom = atom(null, (get, set, targetId: string) => {
  const currentModals = get(modalsAtom);
  const targetModal = currentModals.find((m) => m.id === targetId);

  if (targetModal) {
    const updatedModals = currentModals.map((m) =>
      m.id === targetId ? { ...m, isOpen: false } : m,
    );
    set(modalsAtom, updatedModals);

    setTimeout(() => {
      set(
        modalsAtom,
        get(modalsAtom).filter((m) => m.id !== targetId),
      );
    }, MODAL_CONSTANTS.MODAL_CLOSE_ANIMATION_MS);
  }
});

export const openModalAtom = atom(
  null,
  (get, set, modal: Omit<ModalState, 'isOpen'>) => {
    const currentModals = get(modalsAtom);

    if (modal.type === 'toast') {
      const existingToast = currentModals.find(
        (m) => m.type === 'toast' && m.isOpen,
      );
      if (existingToast) {
        return;
      }
    }

    const newModal = { ...modal, isOpen: true };
    set(modalsAtom, [...currentModals, newModal]);

    if (modal.duration && modal.duration > 0) {
      setTimeout(() => {
        set(closeModalAtom, modal.id);
      }, modal.duration);
    }
  },
);

export const closeAllModalsAtom = atom(null, (get, set) => {
  const currentModals = get(modalsAtom);
  const updatedModals = currentModals.map((m) => ({ ...m, isOpen: false }));
  set(modalsAtom, updatedModals);

  setTimeout(() => {
    set(modalsAtom, []);
  }, MODAL_CONSTANTS.MODAL_CLOSE_ANIMATION_MS);
});
