import { supabase } from '@/util/supabase';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function signInWithKakao() {
  console.log(baseUrl);
  return supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${baseUrl}/`,
    },
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}
