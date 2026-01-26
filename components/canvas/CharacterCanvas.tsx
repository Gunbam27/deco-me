'use client';

import { Layer, Image as KonvaImage, Text, Stage } from 'react-konva';
import useImage from 'use-image';
import { 
  CANVAS_CHARACTER_RATIO, 
  CANVAS_MAX_SIZE,
  SPEECH_BUBBLE_FONT_SIZE, 
  SPEECH_BUBBLE_HEIGHT, 
  SPEECH_BUBBLE_WIDTH, 
  SPEECH_BUBBLE_X_RATIO, 
  SPEECH_BUBBLE_Y_RATIO 
} from '@/util/canvasConfig';
import { ReactNode } from 'react';

interface Props {
  animalSrc?: string;
  speechBubbleText?: string;
  children?: ReactNode; // For accessories layer or other interactions
  onMouseDown?: (e: any) => void;
  onTouchStart?: (e: any) => void;
}

export function CharacterCanvas({ 
  animalSrc, 
  speechBubbleText, 
  children,
  onMouseDown,
  onTouchStart
}: Props) {
  const [animalImage] = useImage(animalSrc || '');
  const [speechBubbleImage] = useImage('/speech-bubble.svg');
  const width = CANVAS_MAX_SIZE;
  const height = CANVAS_MAX_SIZE;

  const characterSize = width * CANVAS_CHARACTER_RATIO;
  const offset = (width - characterSize) / 2;

  return (
    <Stage 
      width={width} 
      height={height}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ touchAction: 'none' }}
    >
      {/* Background / Animal Layer */}
      <Layer>
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
      </Layer>

      {/* Accessories / Interactive Layer */}
      <Layer>
        {children}
      </Layer>

      {/* Foreground / Speech Bubble Layer */}
      <Layer>
        {speechBubbleText && speechBubbleImage && (
          <>
            <KonvaImage
              listening={false}
              image={speechBubbleImage}
              x={width * SPEECH_BUBBLE_X_RATIO}
              y={height * SPEECH_BUBBLE_Y_RATIO}
              width={SPEECH_BUBBLE_WIDTH}
              height={SPEECH_BUBBLE_HEIGHT}
            />
            <Text
              text={speechBubbleText}
              x={width * SPEECH_BUBBLE_X_RATIO}
              y={height * SPEECH_BUBBLE_Y_RATIO}
              width={SPEECH_BUBBLE_WIDTH}
              height={SPEECH_BUBBLE_HEIGHT - 4}
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
