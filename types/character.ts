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
    src: '/character/Capybara.png',
    name: '카피바라',
  },
  {
    type: 'cat',
    id: 'char-2',
    src: '/character/Cat.png',
    name: '고양이',
  },
  {
    type: 'chick',
    id: 'char-3',
    src: '/character/Chick.png',
    name: '병아리',
  },
  {
    type: 'dog',
    id: 'char-4',
    src: '/character/Dog.png',
    name: '강아지',
  },
  {
    type: 'platypus',
    id: 'char-5',
    src: '/character/Platypus.png',
    name: '오리너구리',
  },
  {
    type: 'whale',
    id: 'char-6',
    src: '/character/Whale.png',
    name: '고래',
  },
  {
    type: 'wolf',
    id: 'char-7',
    src: '/character/Wolf.png',
    name: '늑대',
  },
  {
    type: 'weasel',
    id: 'char-8',
    src: '/character/Weasel.png',
    name: '족제비',
  },
];

export const BACKGROUND = [
  {
    type: 'club',
    id: 'bg-1',
    src: '/bg/Club.jpg',
    name: '클럽',
  },
  {
    type: 'park',
    id: 'bg-2',
    src: '/bg/Park.jpg',
    name: '공원',
  },
  {
    type: 'redcarpet',
    id: 'bg-3',
    src: '/bg/Redcarpet.jpg',
    name: '레드카펫',
  },
  {
    type: 'room',
    id: 'bg-4',
    src: '/bg/Room.jpg',
    name: '방',
  },
];
