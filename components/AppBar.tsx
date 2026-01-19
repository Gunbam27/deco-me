'use client';

import Image from 'next/image';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { createShareLink } from '@/util/shareLink';
import { useToastStore } from '@/store/toastStore';

export function AppBar() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const showToast = useToastStore((s) => s.show);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  async function handleCopyLink() {
    if (!user) return;

    const link = createShareLink({
      ownerId: user.id,
      displayName:
        user.user_metadata?.display_name || user.user_metadata?.name || '친구',
    });

    await navigator.clipboard.writeText(link);
    showToast('친구에게 보낼 링크가 복사됐어요!', 600);
  }

  return (
    <header className="sticky top-0 z-50 bg-pink-100 border-b border-black/5">
      <div className="mx-auto max-w-[480px] h-14 px-4 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Deco Me"
          width={110}
          height={40}
          priority
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        {user && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="text-sm font-medium px-3 py-1.5 rounded-full
                bg-white text-brown-500 shadow hover:bg-pink-50 transition"
            >
              🔗 친구에게 부탁하기
            </button>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-brown-500 px-3 py-1.5 rounded-full hover:bg-pink-200 transition"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
