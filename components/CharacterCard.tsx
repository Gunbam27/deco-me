import { useRef, useState } from 'react';
import { CharacterPreviewCanvas } from './CharacterPreviewCanvas';
import { useModalStore } from '@/store/modalStore';
import { DownloadIcon, LoaderIcon, TrashIcon } from 'lucide-react';

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

  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // 이미지 저장 핸들러
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current || downloading) return;

    try {
      setDownloading(true);
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // 투명 배경 허용 (또는 'white'로 강제)
        scale: 2, // 고해상도
        ignoreElements: (element) => {
          // 버튼들은 제외하고 캡처
          if (element.classList.contains('ignore-capture')) return true;
          return false;
        },
      });

      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `my-character-${character.created_by_name || 'deco'}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('이미지 저장 실패:', err);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative flex flex-col items-center gap-1 p-3 rounded-xl border shadow-sm cursor-pointer hover:bg-gray-50 bg-white"
    >
      <div className="absolute top-2 right-2 flex gap-1 z-10 ignore-capture">
        {/* 다운로드 버튼 */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-300 transition"
          title="이미지로 저장"
        >
          {downloading ?<LoaderIcon className="w-4 h-4 animate-spin" /> : <DownloadIcon className="w-4 h-4" />}
        </button>

        {/* 삭제 버튼 - 소유자인 경우에만 표시 */}
        {isOwner && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirm(() => onDelete(character.id));
            }}
            className="w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 flex items-center justify-center"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="pointer-events-none touch-pan-y">
        <CharacterPreviewCanvas parts={parts} />
      </div>
      
      {/* 만든 사람 표시 */}
      <div className="flex-1 w-full text-center">
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
