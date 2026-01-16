import { CharacterPreviewCanvas } from './CharacterPreviewCanvas';

export function CharacterCard({ character }: { character: any }) {
  const parts =
    typeof character.parts === 'string'
      ? JSON.parse(character.parts)
      : character.parts;

  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl border shadow-sm cursor-pointer hover:bg-gray-50 bg-white">
      <CharacterPreviewCanvas parts={parts} size={120} />
      {/* 추후 친구 display_name 삽입 */}
      <div className="flex-1">
        <p>만든 사람 : {character.is_self ? '나' : '친구 캐릭터'}</p>
      </div>
    </div>
  );
}
