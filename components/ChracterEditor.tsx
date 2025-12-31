'use client';
import { createCharacter } from '@/service/charactersApi';
import { useCharacterStore } from '@/store/chraterStore';

export type EditorMode = 'self' | 'friend' | 'readonly';

export default function CharacterEditor(props: { mode: EditorMode }) {
  const parts = useCharacterStore((s) => s.parts);

  async function handleSave() {
    await createCharacter({
      ownerId: 'yejin',
      createdBy: 'yejin',
      isSelf: true,
      parts,
    });
  }

  return (
    <main className="p-6 space-y-4">
      <section className="border p-4">캐릭터 미리보기 영역</section>

      <section className="flex gap-2">
        <button className="btn">눈 변경</button>
        <button className="btn">머리 변경</button>
      </section>

      {props.mode !== 'readonly' && (
        <button className="btn-primary" onClick={handleSave}>
          저장하기
        </button>
      )}
    </main>
  );
}
