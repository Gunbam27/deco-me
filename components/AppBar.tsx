'use client';

import Image from 'next/image';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export function AppBar() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <header
      className="
        sticky top-0 z-50
        bg-pink-100
        border-b border-black/5
      "
    >
      <div
        className="
          mx-auto max-w-[480px]
          h-14
          px-4
          flex items-center justify-between
        "
      >
        {/* 좌측 로고 */}
        <Image
          src="/logo.png"
          alt="Deco Me"
          width={110}
          height={40}
          priority
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        {/* 우측 로그아웃 (로그인 시에만) */}
        {user && (
          <button
            onClick={handleLogout}
            className="
              text-sm font-medium
              text-brown-500
              px-3 py-1.5
              rounded-full
              hover:bg-pink-200
              transition
            "
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
