'use client';
import { ACCESSORY, ANIMALS, BACKGROUND } from '@/types/character';
import { useEffect, useRef, useState } from 'react';
import { ThumbnailSlider } from './ThumbnailSlider';
import { useCharacterStore } from '@/store/charaterStore';
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
  const removeAccessory = useCharacterStore((s) => s.removeAccessory);
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
    <section className="mx-auto max-w-[640px] p-4 space-y-4">
      {/* Canvas Card */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <Stage
          width={SIZE}
          height={SIZE}
          onMouseDown={(e) => {
            console.log(
              e.target.getClassName(),
              e.target.name(),
              e.target.getParent()?.name(),
            );
            const target = e.target;

            const isAccessoryOrTransformer =
              target.hasName('accessory') ||
              target.findAncestor('.accessory') ||
              target.hasName('transformer') ||
              target.findAncestor('.transformer');

            if (!isAccessoryOrTransformer) {
              setSelectedId(null);
              transformerRef.current?.nodes([]);
            }
          }}
          onTouchStart={(e) => {
            const clickedOnEmpty =
              e.target === e.target.getStage() ||
              !e.target.hasName('accessory');

            if (clickedOnEmpty) {
              setSelectedId(null);
              transformerRef.current?.nodes([]);
            }
          }}
        >
          <Layer>
            {animalImage && (
              <KonvaImage
                listening={false}
                image={animalImage}
                x={(SIZE - SIZE * SCALE) / 2}
                y={(SIZE - SIZE * SCALE) / 2}
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
            <Transformer name="transformer" ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
      <div className="flex bg-pink-100 rounded-full p-1">
        {tab.map((label, index) => {
          const active = index === selectedTab;
          return (
            <button
              key={label}
              onClick={() => onClickTab(index)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition
          ${active ? 'bg-brown-500 text-white shadow' : 'text-brown-500'}
        `}
            >
              {label}
            </button>
          );
        })}
      </div>
      {/* Slider */}
      {selectedTab === 0 ? (
        <ThumbnailSlider
          items={ANIMALS}
          cols={4}
          rows={2}
          isSelected={(animal) => animal.type === selectedAnimal}
          onSelect={(animal) => setPart('animal', animal.type)}
          renderItem={(animal) => (
            <Image
              src={animal.src}
              alt={animal.name}
              width={100}
              height={100}
            />
          )}
        />
      ) : null}
      {selectedTab === 1 ? (
        <ThumbnailSlider
          items={ACCESSORY}
          cols={4}
          rows={2}
          isSelected={(acce) => accessories.some((a) => a.src === acce.src)}
          onSelect={(acce) => addAccessory(acce)}
          renderItem={(animal) => (
            <Image src={animal.src} alt={animal.name} width={40} height={40} />
          )}
          onRemove={(acce) => {
            removeAccessory(acce.id); // 스토어에서 제거
            if (selectedId === acce.id) {
              setSelectedId(null);
              transformerRef.current?.nodes([]);
            }
          }}
        />
      ) : null}
    </section>
  );
}
