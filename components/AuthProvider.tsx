// app/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';
import { authRequiredRoutes } from '@/util/authRoutes';
import path from 'path';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);

  // 1. 최초 세션 동기화
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
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
    if (session && pathname === '/login') {
      router.replace('/');
      return;
    }

    if (!session && authRequiredRoutes.includes(pathname)) {
      router.replace('/login');
    }
  }, [session, pathname]);

  return <>{children}</>;
}
