'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { KakaoLoginButton } from '@/components/KakaoLoginButton';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { session, initialized } = useAuthStore();

  // 세션이 있으면 즉시 리다이렉트 (깜빡임 방지)
  useEffect(() => {
    if (initialized && session) {
      const targetUrl = returnUrl || '/';
      router.replace(targetUrl);
    }
  }, [session, initialized, returnUrl, router]);

  // 세션이 있으면 로딩 상태만 표시 (리다이렉트 중)
  if (initialized && session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 세션이 없을 때만 로그인 버튼 표시
  return (
    <div className="flex justify-center items-center h-[400]">
      <div className="max-w-[480] ">
        <KakaoLoginButton returnUrl={returnUrl || undefined} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-500">로딩 중...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
