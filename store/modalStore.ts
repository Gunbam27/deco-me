import { create } from 'zustand';

type ModalState = {
  isVisible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  showDeleteConfirm: (onConfirm: () => void) => void;
  hide: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  title: '확인',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: () => {},
  onCancel: () => {},

  showDeleteConfirm: (onConfirm) => {
    set({
      isVisible: true,
      title: '캐릭터 숨기기',
      message: '정말로 이 캐릭터를 숨기시겠습니까?',
      confirmText: '숨기기',
      cancelText: '취소',
      onConfirm,
      onCancel: () => set({ isVisible: false }),
    });
  },

  hide: () => {
    set({ isVisible: false });
  },
}));