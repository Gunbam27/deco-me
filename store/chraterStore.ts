import { CharacterParts } from '@/types/character';
import { create } from 'zustand';

interface CharacterState {
  parts: CharacterParts;
  setPart: (key: keyof CharacterParts, value: string) => void;
  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  parts: {
    face: 'default',
    hair: 'defalut',
    eyes: 'defalut',
    mouth: 'default',
  },

  setPart: (key, value) =>
    set((state) => ({
      parts: {
        ...state.parts,
        [key]: value,
      },
    })),

  reset: () =>
    set({
      parts: {
        face: 'default',
        hair: 'defalut',
        eyes: 'defalut',
        mouth: 'default',
      },
    }),
}));
