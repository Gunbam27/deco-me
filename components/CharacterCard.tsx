import { CharacterPreviewCanvas } from './CharacterPreviewCanvas';

export function CharacterCard({
  character,
  currentUserId
}: {
  character: any;
  currentUserId?: string;
}) {
  const parts =
    typeof character.parts === 'string'
      ? JSON.parse(character.parts)
      : character.parts;

  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl border shadow-sm cursor-pointer hover:bg-gray-50 bg-white">
      <CharacterPreviewCanvas parts={parts} size={120} />
      {/* 만든 사람 표시 */}
      <div className="flex-1">
        {!character.is_self && currentUserId && (
          <p className="text-xs text-gray-600">
            {character.created_by === currentUserId
              ? `받는 사람 : ${character.owner_name || '친구'}`
              : `만든 사람 : ${character.created_by_name || '친구'}`
            }
          </p>
        )}
      </div>
    </div>
  );
}
