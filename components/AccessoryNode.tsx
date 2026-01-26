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
    if (isSelected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <KonvaImage
      ref={shapeRef}
      name="accessory"
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
        const node = shapeRef.current;
        if (!node) return;

        const scale = node.scaleX();
        const rotation = node.rotation();

        node.scaleX(1);
        node.scaleY(1);

        onChange({
          x: node.x(),
          y: node.y(),
          scale,
          rotation,
        });
      }}
    />
  );
}
