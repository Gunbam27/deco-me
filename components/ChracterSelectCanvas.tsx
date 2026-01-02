'use client';
import { ANIMALS, BACKGROUND } from '@/types/character';
import { useEffect, useRef, useState } from 'react';
import { CharacterThumbnailSlider } from './ChracterThumbnailSlider';
import { useCharacterStore } from '@/store/chraterStore';
import Image from 'next/image';

export function ChracterSelectCanvas() {
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const animal = ANIMALS.find((a) => a.type === selectedAnimal);
  const tab = ['성격', '악세사리'];
  const [selectedTab, setSelectedTab] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const characterImageRef = useRef<HTMLImageElement | null>(null);
  const SIZE = 640;
  const SCALE = 0.6;

  function onClickTab(selectedTab: number) {
    setSelectedTab(selectedTab);
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = SIZE;
    canvas.height = SIZE;
    ctxRef.current = canvas.getContext('2d');
    const ctx = ctxRef.current;

    characterImageRef.current = new window.Image();
    const image = characterImageRef.current;
    if (!ctx || !image) return;

    image.onload = () => {
      const w = SIZE * SCALE;
      const h = SIZE * SCALE;
      const x = (SIZE - w) / 2;
      const y = (SIZE - h) / 2;
      ctx.drawImage(image, x, y, w, h);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext('2d');
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, SIZE, SIZE);

    if (!characterImageRef.current) return;
    characterImageRef.current.src = `${animal?.src || ANIMALS[0].src}`;
  }, [animal]);

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
      {selectedTab === 0 ? <CharacterThumbnailSlider /> : null}
    </section>
  );
}
