'use client';
import { ACCESSORY, ANIMALS, BACKGROUND } from '@/types/character';
import { useEffect, useRef, useState } from 'react';
import { ThumbnailSlider } from './ChracterThumbnailSlider';
import { useCharacterStore } from '@/store/chraterStore';
import Image from 'next/image';
import { createAccessoryFromPreset } from '@/util/accessory';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import { AccessoryNode } from './AccessoryNode';
import useImage from 'use-image';

export function ChracterSelectCanvas() {
  const SIZE = 640;
  const SCALE = 0.6;

  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const accessories = useCharacterStore((s) => s.parts.accessories);
  const setPart = useCharacterStore((s) => s.setPart);
  const addAccessory = useCharacterStore((s) => s.addAccessory);
  const updateAccessory = useCharacterStore((s) => s.updateAccessory);

  const tab = ['성격', '악세사리'];
  const [selectedTab, setSelectedTab] = useState(0);

  const animal = ANIMALS.find((a) => a.type === selectedAnimal);
  const [animalImage] = useImage(animal?.src || '');

  const transformerRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function onClickTab(selectedTab: number) {
    setSelectedTab(selectedTab);
  }

  return (
    <section className="mx-auto max-w-[640px]">
      <div className="canvas_wrap">
        <Stage width={SIZE} height={SIZE}>
          <Layer>
            {animalImage && (
              <KonvaImage
                image={animalImage}
                x={(SIZE - SIZE * SCALE) / 2}
                y={SIZE - (SIZE * SCALE) / 2}
                width={SIZE * SCALE}
                height={SIZE * SCALE}
              />
            )}
            {accessories.map((acce) => (
              <AccessoryNode
                key={acce.id}
                acce={acce}
                isSelected={acce.id === selectedId}
                onSelect={() => setSelectedId(acce.id)}
                onChange={(attrs) => updateAccessory(acce.id, attrs)}
                transformerRef={transformerRef}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
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
      {selectedTab === 0 ? (
        <ThumbnailSlider
          items={ANIMALS}
          visibleCount={4}
          isSelected={(animal) => animal.type === selectedAnimal}
          onSelect={(animal) => setPart('animal', animal.type)}
          renderItem={(animal) => (
            <Image src={animal.src} alt={animal.name} width={72} height={72} />
          )}
        />
      ) : null}
      {selectedTab === 1 ? (
        <ThumbnailSlider
          items={ACCESSORY}
          visibleCount={5}
          isSelected={(acce) =>
            selectedAccessory.some((a) => a.src === acce.src)
          }
          onSelect={(acce) => addAccessory(createAccessoryFromPreset(acce))}
          renderItem={(animal) => (
            <Image src={animal.src} alt={animal.name} width={72} height={72} />
          )}
        />
      ) : null}
    </section>
  );
}
