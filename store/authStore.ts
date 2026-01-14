import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  initialized: false,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      initialized: true,
    }),

  clear: () =>
    set({
      user: null,
      session: null,
      initialized: true,
    }),
}));
