'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getMyCharacter } from '@/service/charactersApi';

export default function EntryPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const [hasCharacter, setHasCharacter] = useState<boolean | null>(null);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    getMyCharacter(user.id)
      .then(() => setHasCharacter(true))
      .catch(() => setHasCharacter(false));
  }, [initialized, user, router]);

  if (!initialized || hasCharacter === null) {
    return <p className="text-center mt-10">로딩 중...</p>;
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <button
        className="w-full py-3 rounded-xl bg-brown-500 text-white font-semibold"
        onClick={() => router.push('/closet')}
      >
        👕 내 캐릭터 옷장 보기
      </button>

      <button
        className="w-full py-3 rounded-xl bg-pink-400 text-white font-semibold"
        onClick={() => router.push('/editor')}
      >
        🎨 캐릭터 꾸미기
      </button>
    </main>
  );
}
