'use client';
import { getCharacterByOwnerId, getMyCharacter } from '@/service/charactersApi';
import { useCharacterStore } from '@/store/chraterStore';
import { Character } from '@/types/character';
import { useEffect, useState } from 'react';

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCharacters() {
    const data = await getCharacterByOwnerId('yejin');
    return data;
  }
  useEffect(() => {
    setLoading(true);
    fetchCharacters().then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">내 캐릭터</h1>

      <section className="border p-4">
        캐릭터 미리보기 영역
        {characters.map((character) => {
          return (
            <div key={character.id}>
              <p>{character.parts.animal}</p>
              <p>{character.parts.background}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
