import { supabase } from '@/util/supabase';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function signInWithKakao(returnUrl?: string) {
  console.log(baseUrl);
  // returnUrl이 있으면 그대로 사용, 없으면 홈으로
  const redirectTo = returnUrl 
    ? `${baseUrl}${returnUrl}` 
    : `${baseUrl}/`;
  
  return supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo,
    },
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}
