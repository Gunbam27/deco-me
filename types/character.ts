export type CharacterParts = {
  face: string;
  hair: string;
  eyes: string;
  mouth: string;
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
