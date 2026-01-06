'use client';
import { ACCESSORY, ANIMALS, BACKGROUND } from '@/types/character';
import { useEffect, useRef, useState } from 'react';
import { ThumbnailSlider } from './ChracterThumbnailSlider';
import { useCharacterStore } from '@/store/chraterStore';
import Image from 'next/image';
import { createAccessoryFromPreset } from '@/util/accessory';

export function ChracterSelectCanvas() {
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const selectedAccessory = useCharacterStore((s) => s.parts.accessories);
  const setPart = useCharacterStore((s) => s.setPart);
  const addAccessory = useCharacterStore((s) => s.addAccessory);
  const animal = ANIMALS.find((a) => a.type === selectedAnimal);
  const tab = ['성격', '악세사리'];
  const [selectedTab, setSelectedTab] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const characterImageRef = useRef<HTMLImageElement | null>(null);
  const accesorryImageRef = useRef<HTMLImageElement | null>(null);

  const SIZE = 640;
  const SCALE = 0.6;

  function onClickTab(selectedTab: number) {
    setSelectedTab(selectedTab);
  }

  function drawCharacter(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const w = SIZE * SCALE;
    const h = SIZE * SCALE;
    const x = (SIZE - w) / 2;
    const y = (SIZE - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }

  function drawAccessory(
    ctx: CanvasRenderingContext2D,
    acce: { src: string; x: number; y: number; scale: number },
  ) {
    const img = new window.Image();
    img.src = acce.src;

    img.onload = () => {
      ctx.drawImage(
        img,
        acce.x,
        acce.y,
        img.width * acce.scale,
        img.height * acce.scale,
      );
    };
  }

  function drawScene() {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, SIZE, SIZE);

    if (characterImageRef.current) {
      drawCharacter(ctx, characterImageRef.current);
    }

    selectedAccessory.forEach((acce) => {
      drawAccessory(ctx, acce);
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = SIZE;
    canvas.height = SIZE;
    ctxRef.current = canvas.getContext('2d');

    characterImageRef.current = new window.Image();
  }, []);

  useEffect(() => {
    if (!characterImageRef.current) return;

    characterImageRef.current.src = animal?.src || ANIMALS[0].src;
    characterImageRef.current.onload = drawScene;
  }, [animal]);

  useEffect(() => {
    drawScene();
  }, [selectedAccessory]);

  return (
    <section className="mx-auto max-w-[640px]">
      <div className="canvas_wrap">
        <canvas ref={canvasRef} className="w-full"></canvas>
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
