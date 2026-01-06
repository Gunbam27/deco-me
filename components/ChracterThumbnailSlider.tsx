import { useCharacterStore } from '@/store/chraterStore';
import { ACCESSORY, ANIMALS } from '@/types/character';
import { createAccessoryFromPreset } from '@/util/accessory';
import Image from 'next/image';

export function CharacterThumbnailSlider() {
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const accessories = useCharacterStore((s) => s.parts.accessories);

  const setPart = useCharacterStore((s) => s.setPart);
  const addAccessory = useCharacterStore((s) => s.addAccessory);
  return (
    <div className="flex">
      {ANIMALS.map((animal) => {
        const isSelected = animal.type === selectedAnimal;
        return (
          <div
            key={animal.id}
            className={`border ${isSelected ? 'border-blue-500' : 'border-transparent'} w-full`}
            onClick={() => setPart('animal', animal.type)}
          >
            <Image src={animal.src} alt={animal.name} width={72} height={72} />
          </div>
        );
      })}
      {ACCESSORY.map((acce) => {
        const isSelected = accessories.some((a) => a.id === acce.id);
        return (
          <div
            key={acce.id}
            className={`border ${isSelected ? 'border-blue-500' : 'border-transparent'} w-full`}
            onClick={() => addAccessory(createAccessoryFromPreset(acce))}
          >
            <Image src={acce.src} alt={acce.name} width={72} height={72} />
          </div>
        );
      })}
    </div>
  );
}
