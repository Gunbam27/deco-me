'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/util/supabase';
import { useAuthStore } from '@/store/authStore';
import { getMyCharacter } from '@/service/charactersApi';

export default function EntryPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    getMyCharacter(user.id)
      .then(() => {
        router.replace('/closet');
      })
      .catch(() => {
        router.replace('/editor');
      });
  }, [initialized, user, router]);

  return <p className="text-center mt-10">로딩 중...</p>;
}

// <main>
//   <CharacterList />
// </main>
