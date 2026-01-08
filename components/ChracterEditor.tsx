'use client';
import { createCharacter } from '@/service/charactersApi';
import { useCharacterStore } from '@/store/charaterStore';
import { ChracterSelectCanvas } from './ChracterSelectCanvas';
import { EditorMode } from '@/types/editormode';

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
    <main>
      <ChracterSelectCanvas />

      {props.mode !== 'readonly' && (
        <button className="btn-primary" onClick={handleSave}>
          저장하기
        </button>
      )}
    </main>
  );
}
