import { CharacterParts } from '@/types/character';
import { create } from 'zustand';

interface CharacterState {
  parts: CharacterParts;
  setPart: (key: keyof CharacterParts, value: string) => void;
  setAllparts: (parts: CharacterParts) => void;

  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  parts: {
    animal: 'capybara',
    accessory: 'default',
    background: 'default',
  },

  setPart: (key, value) =>
    set((state) => ({
      parts: {
        ...state.parts,
        [key]: value,
      },
    })),
  setAllparts: (parts) => set({ parts }),
  reset: () =>
    set({
      parts: {
        animal: 'capybara',
        accessory: 'default',
        background: 'default',
      },
    }),
}));
