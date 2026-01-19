import { useCharacterStore } from '@/store/charaterStore';
import { ACCESSORY, ANIMALS } from '@/types/character';
import { createAccessoryFromPreset } from '@/util/accessory';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ThumbnailSliderProps<T extends { name?: string }> {
  items: T[];
  cols?: number;
  rows?: number;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  isSelected: (item: T) => boolean;
  onSelect: (item: T) => void;
  onRemove?: (item: T) => void;
  showName?: boolean;
}

export function ThumbnailSlider<T extends { name?: string }>({
  items,
  cols = 3,
  rows = 2,
  renderItem,
  isSelected,
  onSelect,
  onRemove,
  showName = true,
}: ThumbnailSliderProps<T>) {
  const [page, setPage] = useState(0);

  const pageSize = cols * rows;
  const maxPage = Math.ceil(items.length / pageSize) - 1;
  const start = page * pageSize;
  const visibleItems = items.slice(start, start + pageSize);

  return (
    <div className="flex items-center gap-3 w-full">
      <button
        disabled={page === 0}
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        className="
    flex items-center justify-center
    w-9 h-9
    rounded-full
    bg-white shadow
    text-brown-500
    hover:bg-pink-100
    disabled:opacity-30
    disabled:cursor-not-allowed
    transition
  "
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <div
        className="grid gap-3 w-full"
        style={{
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        {visibleItems.map((item, idx) => {
          const selected = isSelected(item);

          return (
            <div
              key={idx}
              className="flex flex-col gap-1.5"
            >
              <div
                className={`
                relative aspect-square rounded-xl bg-white shadow-sm
                flex items-center justify-center
                cursor-pointer
                ${selected ? 'ring-2 ring-[#7c3b18]' : 'ring-1 ring-pink-200'}
              `}
                onClick={() => onSelect(item)}
              >
                {/* 썸네일 이미지 */}
                {renderItem(item, selected)}

                {/* X 버튼: onRemove가 있으면 렌더링 */}
                {onRemove && selected && (
                  <button
                    className="
                    absolute -top-2 -right-2
                    w-6 h-6 rounded-full
                    bg-red-500 text-white text-sm
                    flex items-center justify-center
                    z-10
                  "
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item);
                    }}
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                )}
              </div>
              
              {/* 이름 표시 */}
              {showName && item.name && (
                <p className={`
                  text-xs text-center
                  ${selected ? 'text-[#7c3b18] font-semibold' : 'text-gray-600'}
                  truncate px-1
                `}>
                  {item.name}
                </p>
              )}
            </div>
          );
        })}

        {Array.from({
          length: cols * rows - visibleItems.length,
        }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="aspect-square" />
            {showName && <div className="h-4" />}
          </div>
        ))}
      </div>

      <button
        disabled={page === maxPage}
        onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
        className="
    flex items-center justify-center
    w-9 h-9
    rounded-full
    bg-white shadow
    text-brown-500
    hover:bg-pink-100
    disabled:opacity-30
    disabled:cursor-not-allowed
    transition
  "
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}
