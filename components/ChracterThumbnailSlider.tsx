import { useCharacterStore } from '@/store/chraterStore';
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
}

export function ThumbnailSlider<T>({
  items,
  visibleCount = 4,
  renderItem,
  isSelected,
  onSelect,
}: ThumbnailSliderProps<T>) {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(items.length / visibleCount) - 1;
  const start = page * visibleCount;
  const visibleItems = items.slice(start, start + visibleCount);

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
              className={`border ${
                selected ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => onSelect(item)}
            >
              {renderItem(item, selected)}
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
