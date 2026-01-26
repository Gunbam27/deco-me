'use client';

import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { ANIMALS } from '@/types/character';
import { useState } from 'react';
import { CANVAS_MAX_SIZE } from '@/util/canvasConfig';
import { CharacterCanvas } from './canvas/CharacterCanvas';

interface Props {
  parts: any;
}

export function CharacterPreviewCanvas({ parts }: Props) {
  const animal = ANIMALS.find((a) => a.type === parts.animal);

  
  return (
    <CharacterCanvas
      animalSrc={animal?.src}
      speechBubbleText={parts.speechBubble}
    >
      {/* 악세사리 */}
      {parts.accessories?.map((acce: any) => (
        <AccessoryPreview key={acce.id} acce={acce} />
      ))}
    </CharacterCanvas>
  );
}

function AccessoryPreview({ acce }: { acce: any }) {
  const [img] = useImage(acce.src);

  if (!img) return null;

  return (
    <KonvaImage
      listening={false}
      image={img}
      x={acce.x}
      y={acce.y}
      width={img?.width}
      height={img?.height}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      scaleX={acce.scale}
      scaleY={acce.scale}
      rotation={acce.rotation || 0}
    />
  );
}
