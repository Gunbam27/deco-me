'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { EditorMode } from '@/types/editormode';
import { EditorHeader } from '@/components/EditorHeader';
import { ChracterSelectCanvas } from '@/components/ChracterSelectCanvas';

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { session, initialized } = useAuthStore();

  const ownerIdFromQuery = searchParams.get('owner');
  const ownerNameFromQuery = searchParams.get('name');

  // 로딩 상태 처리
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 세션이 없으면 AuthProvider가 로그인 페이지로 리다이렉트할 것임
  if (!session) {
    return null;
  }

  const myUserId = session.user.id;
  const isFriendMode = ownerIdFromQuery && ownerIdFromQuery !== myUserId;

  // 친구 모드인데 ownerId가 유효하지 않은 경우 처리
  if (isFriendMode && !ownerIdFromQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-center text-red-500 mb-4">
          잘못된 링크입니다. 올바른 링크를 확인해주세요.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 rounded-xl bg-brown-500 text-white font-semibold"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const mode: EditorMode = isFriendMode ? 'friend' : 'self';

  const ownerId = isFriendMode ? ownerIdFromQuery! : myUserId;
  const ownerName = isFriendMode
    ? (ownerNameFromQuery 
        ? decodeURIComponent(ownerNameFromQuery) 
        : '친구')
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

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">로딩 중...</p>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
