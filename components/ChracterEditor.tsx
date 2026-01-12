'use client';
import { createCharacter } from '@/service/charactersApi';
import { useCharacterStore } from '@/store/charaterStore';
import { ChracterSelectCanvas } from './ChracterSelectCanvas';
import { EditorMode } from '@/types/editormode';
import { AppBar } from './AppBar';

export default function CharacterEditor(props: { mode: EditorMode }) {
  return (
    <main className="flex flex-col justify-items-center">
      <ChracterSelectCanvas mode="self" />
    </main>
  );
}
