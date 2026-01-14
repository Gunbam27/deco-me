// app/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);

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

  return <>{children}</>;
}
