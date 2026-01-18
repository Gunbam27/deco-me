'use client';

import { ChracterSelectCanvas } from './ChracterSelectCanvas';
import { EditorMode } from '@/types/editormode';
import { Session } from '@supabase/supabase-js';

interface Props {
  mode: EditorMode;
  ownerId: string;
  ownerName?: string | null;
  session: Session;
}

export default function CharacterEditor({ mode, ownerId, session }: Props) {
  return (
    <main className="flex flex-col justify-items-center">
      <ChracterSelectCanvas mode={mode} ownerId={ownerId} session={session} />
    </main>
  );
}
