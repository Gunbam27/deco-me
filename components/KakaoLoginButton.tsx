'use client';

import { signInWithKakao } from '@/service/authApi';

interface Props {
  returnUrl?: string;
}

export function KakaoLoginButton({ returnUrl }: Props) {
  return (
    <button
      onClick={() => signInWithKakao(returnUrl)}
      className="
        w-full p-3 rounded-xl
        bg-[#FEE500] text-black font-semibold
        flex items-center justify-center gap-2
      "
    >
      카카오로 시작하기
    </button>
  );
}
