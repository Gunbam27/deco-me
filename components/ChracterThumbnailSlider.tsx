import { useCharacterStore } from '@/store/chraterStore';
import { ANIMALS, AnimalType } from '@/types/character';
import Image from 'next/image';

export function CharacterThumbnailSlider() {
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const setPart = useCharacterStore((s) => s.setPart);
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
    </div>
  );
}
