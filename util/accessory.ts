import { Accessory, AccessoryPreset } from '@/types/character';

export function createAccessoryFromPreset(
  preset: AccessoryPreset,
  options?: {
    x?: number;
    y?: number;
    scale?: number;
  },
): Accessory {
  return {
    id: crypto.randomUUID(), // 캔버스 객체 id
    src: preset.src,
    x: options?.x ?? 320,
    y: options?.y ?? 320,
    scale: options?.scale ?? 1,
  };
}
