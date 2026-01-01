export type AnimalType = (typeof ANIMALS)[number]['type'];

export type CharacterParts = {
  animal: AnimalType;
  accessory?: string;
  background?: string;
};

export type Character = {
  id: string;
  ownerId: string; // 내 캐릭터 주인 id
  createdBy: string; // 만든 사람 id(나 or 친구)
  isSelf: boolean; // 내가 만든 내 캐릭터인지 여부
  parts: CharacterParts; // 캐릭터 구성 요소
  createdAt: string;
};

export const ANIMALS = [
  {
    type: 'capybara',
    id: 'char-1',
    src: '/character/Capybara.svg',
    name: '카피바라',
  },
  {
    type: 'cat',
    id: 'char-2',
    src: '/character/Cat.svg',
    name: '고양이',
  },
  {
    type: 'whale',
    id: 'char-3',
    src: '/character/Whale.svg',
    name: '고래',
  },
  {
    type: 'wolf',
    id: 'char-4',
    src: '/character/Wolf.svg',
    name: '늑대',
  },
];
