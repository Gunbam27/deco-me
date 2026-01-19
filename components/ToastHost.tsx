'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/store/toastStore';

export function ToastHost() {
  const { message, visible, hide } = useToastStore();

  // visible=false로 내려갈 때 메시지를 조금 늦게 지워 자연스러운 전환 유지
  useEffect(() => {
    if (visible) return;
    if (!message) return;
    const t = setTimeout(() => {
      // message는 show()에서만 세팅되므로, 그냥 숨김만 유지해도 되지만
      // 깔끔하게 텍스트 제거
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (useToastStore as any).setState({ message: null });
    }, 250);
    return () => clearTimeout(t);
  }, [visible, message]);

  if (!message) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-[999] flex justify-center px-4 pointer-events-none">
      <div
        className={`
          pointer-events-auto
          rounded-2xl px-4 py-3 shadow-lg
          bg-white/90 backdrop-blur
          border border-pink-200
          text-brown-500
          transition-all duration-200
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
        role="status"
        aria-live="polite"
        onClick={hide}
      >
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
}

