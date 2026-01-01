'use client';
import { ANIMALS } from '@/types/character';
import Image from 'next/image';
import { useState } from 'react';
import { CharacterThumbnailSlider } from './ChracterThumbnailSlider';
import { useCharacterStore } from '@/store/chraterStore';

export function ChracterSelectCanvas() {
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const animal = ANIMALS.find((a) => a.type === selectedAnimal);
  const tab = ['성격', '악세사리', '배경'];
  const [selectedTab, setSelectedTab] = useState(0);

  function onClickTab(selectedTab: number) {
    setSelectedTab(selectedTab);
  }

  return (
    <section>
      <div className="w-[260px] h-[260px] flex items-center justify-center rounded-xl bg-gray-100">
        <Image
          src={animal?.src || ''}
          alt={animal?.name || '이미지'}
          width={220}
          height={220}
          priority
        />
      </div>
      <div className="w-full flex align-center">
        {tab.map((tab, index) => (
          <div
            className={`w-full text-center ${index === selectedTab ? 'bg-blue-500' : 'bg-white-500'}`}
            key={tab}
            onClick={() => onClickTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      {selectedTab === 0 ? <CharacterThumbnailSlider /> : null}
    </section>
  );
}
