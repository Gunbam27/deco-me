'use client';

import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { ANIMALS } from '@/types/character';
import { useState } from 'react';

interface Props {
  parts: any;
  size?: number;
}

export function CharacterPreviewCanvas({ parts, size = 160 }: Props) {
  const MAX_SIZE = 300;
  const CHARACTER_RATIO = 1.5;
  const animal = ANIMALS.find((a) => a.type === parts.animal);
  const [animalImage] = useImage(animal?.src || '');
  const [stageSize, setStageSize] = useState(MAX_SIZE);
  const characterSize = stageSize * CHARACTER_RATIO;
  const offset = (stageSize - characterSize) / 2;

  return (
    <Stage width={MAX_SIZE} height={MAX_SIZE}>
      <Layer>
        {/* 캐릭터 */}
        {animalImage && (
          <KonvaImage
            listening={false}
            image={animalImage}
            x={offset}
            y={offset}
            width={characterSize}
            height={characterSize}
          />
        )}

        {/* 악세사리 */}
        {parts.accessories?.map((acce: any) => (
          <AccessoryPreview key={acce.id} acce={acce} />
        ))}
      </Layer>
    </Stage>
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
    />
  );
}
