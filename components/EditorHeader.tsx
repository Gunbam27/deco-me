import { EditorMode } from '@/types/editormode';

interface Props {
  mode: EditorMode;
  ownerName: string;
}

export function EditorHeader({ mode, ownerName }: Props) {
  return (
    <header className="py-3 text-center">
      {mode === 'friend' ? (
        <h1 className="text-lg font-bold text-brown-500">
          💌 {ownerName}의 캐릭터 만들어주기
        </h1>
      ) : (
        <h1 className="text-lg font-bold text-brown-500">내 캐릭터 꾸미기</h1>
      )}
    </header>
  );
}
