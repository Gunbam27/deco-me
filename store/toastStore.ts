import { create } from 'zustand';

type ToastState = {
  message: string | null;
  visible: boolean;
  show: (message: string, durationMs?: number) => void;
  hide: () => void;
};

let timer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  visible: false,
  show: (message, durationMs = 600) => {
    if (timer) clearTimeout(timer);
    set({ message, visible: true });
    timer = setTimeout(() => {
      set({ visible: false });
    }, durationMs);
  },
  hide: () => {
    if (timer) clearTimeout(timer);
    timer = null;
    set({ visible: false });
  },
}));

