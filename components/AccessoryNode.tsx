import { Image as KonvaImage } from 'react-konva';
import { Accessory } from '@/types/character';
import Konva from 'konva';
import useImage from 'use-image';
import { useEffect, useRef } from 'react';

type Props = {
  acce: Accessory;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<Accessory>) => void;
  transformerRef: any;
};

export function AccessoryNode({
  acce,
  isSelected,
  onSelect,
  onChange,
  transformerRef,
}: Props) {
  const [img] = useImage(acce.src);
  const shapeRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <KonvaImage
      name="accessory"
      image={img}
      x={acce.x}
      y={acce.y}
      scaleX={acce.scale}
      scaleY={acce.scale}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scale = node.scaleX();

        node.scaleX(1);
        node.scaleY(1);

        onChange({
          x: node.x(),
          y: node.y(),
          scale,
        });
      }}
      ref={(node) => {
        if (isSelected && node) {
          transformerRef.current?.nodes([node]);
          transformerRef.current?.getLayer()?.batchDraw();
        }
      }}
    />
  );
}
