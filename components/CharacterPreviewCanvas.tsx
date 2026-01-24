'use client';

import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';
import { ANIMALS } from '@/types/character';
import { useState } from 'react';
import { CANVAS_CHARACTER_RATIO, CANVAS_MAX_SIZE, SPEECH_BUBBLE_FONT_SIZE, SPEECH_BUBBLE_HEIGHT, SPEECH_BUBBLE_WIDTH, SPEECH_BUBBLE_X_RATIO, SPEECH_BUBBLE_Y_RATIO } from '@/util/canvasConfig';

interface Props {
  parts: any;
  size?: number;
}

export function CharacterPreviewCanvas({ parts, size = 160 }: Props) {
  const animal = ANIMALS.find((a) => a.type === parts.animal);
  const [animalImage] = useImage(animal?.src || '');
  const [speechBubbleImage] = useImage('/speech-bubble.svg');
  const [stageSize, setStageSize] = useState(CANVAS_MAX_SIZE);
  const characterSize = stageSize * CANVAS_CHARACTER_RATIO;
  const offset = (stageSize - characterSize) / 2;

  return (
    <Stage width={CANVAS_MAX_SIZE} height={CANVAS_MAX_SIZE}>
      {/* 메인 레이어 - 캐릭터와 악세사리 */}
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

      {/* 말풍선 레이어 - 항상 맨 위에 렌더링 */}
      <Layer>
        {parts.speechBubble && speechBubbleImage && (
          <>
            <KonvaImage
              listening={false}
              image={speechBubbleImage}
              x={stageSize * SPEECH_BUBBLE_X_RATIO}
              y={stageSize * SPEECH_BUBBLE_Y_RATIO}
              width={SPEECH_BUBBLE_WIDTH}
              height={SPEECH_BUBBLE_HEIGHT}
            />
            <Text
              text={parts.speechBubble}
              x={stageSize * SPEECH_BUBBLE_X_RATIO}
              y={stageSize * SPEECH_BUBBLE_Y_RATIO}
              width={SPEECH_BUBBLE_WIDTH}
              height={SPEECH_BUBBLE_HEIGHT-4}
              align="center"
              verticalAlign="middle"
              fontSize={SPEECH_BUBBLE_FONT_SIZE}
              fontFamily="Jua"
              fill="#333"
              listening={false}
            />
          </>
        )}
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
