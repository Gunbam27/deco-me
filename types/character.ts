export type AnimalType = (typeof ANIMALS)[number]['type'];

export type CharacterParts = {
  animal: AnimalType;
  accessories: Accessory[];
  background?: string;
  speechBubble?: string; // 4글자 이내 말풍선 텍스트
};

export type Character = {
  id: string;
  ownerId: string; // 내 캐릭터 주인 id
  createdBy: string; // 만든 사람 id(나 or 친구)
  isSelf: boolean; // 내가 만든 내 캐릭터인지 여부
  parts: CharacterParts; // 캐릭터 구성 요소
  createdAt: string;
  deletedAt?: string; // 삭제된 시간 (소프트 삭제용)
};

export type Accessory = {
  id: string; // 캔버스 객체 id
  src: string;
  x: number;
  y: number;
  scale: number;
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

export const ACCESSORY = [
  {
    type: 'face',
    id: 'acce-1',
    src: '/acce/AngryMark.svg',
    name: '빠직마크',
  },
  {
    type: 'face',
    id: 'acce-2',
    src: '/acce/EyebrowL.svg',
    name: '걱정눈썹 L',
  },
  {
    type: 'face',
    id: 'acce-3',
    src: '/acce/EyebrowR.svg',
    name: '걱정눈썹 R',
  },
  {
    type: 'face',
    id: 'acce-4',
    src: '/acce/FakeEyeL.svg',
    name: '가짜눈 L',
  },
  {
    type: 'face',
    id: 'acce-5',
    src: '/acce/FakeEyeR.svg',
    name: '가짜눈 R',
  },
  {
    type: 'face',
    id: 'acce-6',
    src: '/acce/UpsetEyebrow.svg',
    name: '미간 주름',
  },
  {
    type: 'face',
    id: 'acce-7',
    src: '/acce/TearL.svg',
    name: '눈물 L',
  },
  {
    type: 'face',
    id: 'acce-8',
    src: '/acce/TearR.svg',
    name: '눈물 R',
  },
  {
    type: 'clothes',
    id: 'acce-9',
    src: '/acce/Flower.svg',
    name: '꽃',
  },
  {
    type: 'clothes',
    id: 'acce-10',
    src: '/acce/Tie.svg',
    name: '넥타이',
  },
  {
    type: 'hair',
    id: 'acce-11',
    src: '/acce/Hair1.svg',
    name: '앞머리',
  },
  {
    type: 'hair',
    id: 'acce-12',
    src: '/acce/Hair2L.svg',
    name: '양갈래 L',
  },
  {
    type: 'hair',
    id: 'acce-13',
    src: '/acce/Hair2R.svg',
    name: '양갈래 R',
  },
  {
    type: 'hair',
    id: 'acce-14',
    src: '/acce/Hair3.svg',
    name: '곱슬긴머리',
  },
  {
    type: 'hair',
    id: 'acce-15',
    src: '/acce/Hair4.svg',
    name: '똥머리',
  },
  {
    type: 'hair',
    id: 'acce-16',
    src: '/acce/Hair5.svg',
    name: '짧은머리',
  },
  {
    type: 'hair',
    id: 'acce-17',
    src: '/acce/Hair6.svg',
    name: '덮은머리',
  },
];

export type AccessoryPreset = (typeof ACCESSORY)[number];
