// app/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';
import { authRequiredRoutes } from '@/util/authRoutes';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);

  // 1. 최초 세션 동기화
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        // refresh token이 없거나 깨진 경우(예: 로컬 스토리지 정리/만료)는 정상 케이스로 처리
        if (error) {
          clear();
          return;
        }
        setSession(data.session);
      })
      .catch(() => {
        // 예외가 나도 앱이 죽지 않게 무조건 비로그인 상태로 정리
        clear();
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) setSession(session);
        else clear();
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 2. 라우트 가드
  useEffect(() => {
    // 세션이 있고 로그인 페이지에 있으면 리다이렉트
    // (login 페이지 자체에서도 처리하지만, 이중 안전장치)
    if (session && pathname === '/login') {
      const returnUrl = searchParams.get('returnUrl');
      router.replace(returnUrl || '/');
      return;
    }

    // 세션이 없고 인증이 필요한 페이지면 로그인 페이지로 리다이렉트
    if (!session && authRequiredRoutes.includes(pathname)) {
      const queryString = searchParams.toString();
      const currentUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
      router.replace(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, pathname, searchParams.toString(), router]);

  return <>{children}</>;
}
