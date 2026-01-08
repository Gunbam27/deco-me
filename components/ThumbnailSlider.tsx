import { useCharacterStore } from '@/store/charaterStore';
import { ACCESSORY, ANIMALS } from '@/types/character';
import { createAccessoryFromPreset } from '@/util/accessory';
import Image from 'next/image';
import { useState } from 'react';

interface ThumbnailSliderProps<T> {
  items: T[];
  visibleCount?: number; // 한 화면에 몇 개
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  isSelected: (item: T) => boolean;
  onSelect: (item: T) => void;
  onRemove?: (item: T) => void;
}

export function ThumbnailSlider<T>({
  items,
  visibleCount = 4,
  renderItem,
  isSelected,
  onSelect,
  onRemove,
}: ThumbnailSliderProps<T>) {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(items.length / visibleCount) - 1;
  const start = page * visibleCount;
  const visibleItems = items.slice(start, start + visibleCount);
  const accessories = useCharacterStore((s) => s.parts.accessories);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page === 0}
        onClick={() => setPage((p) => Math.max(0, p - 1))}
      >
        ◀
      </button>

      <div className="flex gap-2">
        {visibleItems.map((item, idx) => {
          const selected = isSelected(item);

          return (
            <div
              key={idx}
              className={`relative border rounded ${selected ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => onSelect(item)}
            >
              {/* 썸네일 이미지 */}
              {renderItem(item, selected)}

              {/* X 버튼: onRemove가 있으면 렌더링 */}
              {onRemove && selected && (
                <button
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 클릭 방지
                    onRemove(item); // 스토어에서 제거
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button
        disabled={page === maxPage}
        onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
      >
        ▶
      </button>
    </div>
  );
}
