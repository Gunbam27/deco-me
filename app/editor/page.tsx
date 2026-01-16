'use client';

import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { EditorMode } from '@/types/editormode';
import { EditorHeader } from '@/components/EditorHeader';
import { ChracterSelectCanvas } from '@/components/ChracterSelectCanvas';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const { session, initialized } = useAuthStore();

  const ownerIdFromQuery = searchParams.get('owner');
  const ownerNameFromQuery = searchParams.get('name');

  if (!initialized || !session) return null;

  const myUserId = session.user.id;
  const isFriendMode = ownerIdFromQuery && ownerIdFromQuery !== myUserId;

  const mode: EditorMode = isFriendMode ? 'friend' : 'self';

  const ownerId = isFriendMode ? ownerIdFromQuery! : myUserId;
  const ownerName = isFriendMode
    ? (ownerNameFromQuery ?? '친구')
    : (session.user.user_metadata.display_name ??
      session.user.user_metadata.name ??
      '나');

  return (
    <>
      <EditorHeader mode={mode} ownerName={ownerName} />
      <ChracterSelectCanvas mode={mode} ownerId={ownerId} session={session} />
    </>
  );
}
