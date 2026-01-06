import { Accessory, CharacterParts } from '@/types/character';
import { create } from 'zustand';

interface CharacterState {
  parts: CharacterParts;
  setPart: (key: keyof CharacterParts, value: string) => void;
  setAllparts: (parts: CharacterParts) => void;
  addAccessory: (accessory: Accessory) => void;

  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  parts: {
    animal: 'capybara',
    accessories: [],
    background: 'default',
  },
  setPart: (key, value) =>
    set((state) => ({
      parts: {
        ...state.parts,
        [key]: value,
      },
    })),
  addAccessory: (accessory) =>
    set((state) => ({
      parts: {
        ...state.parts,
        accessories: [...state.parts.accessories, accessory],
      },
    })),
  setAllparts: (parts) => set({ parts }),
  reset: () =>
    set({
      parts: {
        animal: 'capybara',
        accessories: [],
        background: 'default',
      },
    }),
}));
