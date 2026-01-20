import { CharacterPreviewCanvas } from './CharacterPreviewCanvas';
import { useModalStore } from '@/store/modalStore';

export function CharacterCard({
  character,
  currentUserId,
  onDelete
}: {
  character: any;
  currentUserId?: string;
  onDelete?: (characterId: string) => void;
}) {
  const { showDeleteConfirm } = useModalStore();
  const parts =
    typeof character.parts === 'string'
      ? JSON.parse(character.parts)
      : character.parts;

  const isOwner = character.owner_id === currentUserId;
  const isDeleted = !!character.deleted_at;

  if (isDeleted) return null;

  return (
    <div className="relative flex flex-col items-center gap-1 p-3 rounded-xl border shadow-sm cursor-pointer hover:bg-gray-50 bg-white">
      {/* 삭제 버튼 - 소유자인 경우에만 표시 */}
      {isOwner && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            showDeleteConfirm(() => onDelete(character.id));
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600"
        >
          ✕
        </button>
      )}

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
