'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getCharactersForCloset, softDeleteCharacter } from '@/service/charactersApi';
import { CharacterCard } from '@/components/CharacterCard';

export default function ClosetPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    getCharactersForCloset(user.id).then(setCharacters);
  }, [initialized, user, router]);

  if (!initialized || !user) return null;

  const handleDelete = async (characterId: string) => {
    try {
      await softDeleteCharacter(characterId);
      // 삭제 후 캐릭터 목록 다시 불러오기
      const updatedCharacters = await getCharactersForCloset(user.id);
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error('캐릭터 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const myCharacters = characters.filter((c) => c.owner_id === user.id && !c.deleted_at);
  const giftedCharacters = characters.filter(
    (c) => c.created_by === user.id && c.owner_id !== user.id && !c.deleted_at,
  );

  return (
    <main className="max-w-md mx-auto p-6 space-y-6 min-h-screen">
      <h1 className="text-xl font-bold text-center">내 옷장 👕</h1>

      {/* 내 캐릭터 */}
      <section className="space-y-2">
        <h2 className="font-semibold">👤 내 캐릭터</h2>

        {myCharacters.length === 0 && (
          <p className="text-sm text-gray-500">아직 없어요!</p>
        )}

        {myCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            currentUserId={user.id}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {/* 내가 만들어준 캐릭터 */}
      <section className="space-y-2">
        <h2 className="font-semibold">🎁 내가 만들어준 캐릭터</h2>

        {giftedCharacters.length === 0 && (
          <p className="text-sm text-gray-500">아직 없어요!</p>
        )}

        {giftedCharacters.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            currentUserId={user.id}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {/* 새로 만들기 */}
      <button
        className="w-full py-3 rounded-xl bg-pink-400 text-white font-semibold"
        onClick={() => router.push('/editor')}
      >
        🎨 새 캐릭터 꾸미기
      </button>
    </main>
  );
}
