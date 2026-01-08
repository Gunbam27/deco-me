import { Accessory, CharacterParts } from '@/types/character';
import { create } from 'zustand';

interface CharacterState {
  parts: CharacterParts;
  setPart: (key: keyof CharacterParts, value: string) => void;
  setAllparts: (parts: CharacterParts) => void;
  addAccessory: (accessory: Accessory) => void;
  updateAccessory: (id: string, patch: Partial<Accessory>) => void;
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
  updateAccessory: (id, patch) =>
    set((state) => ({
      parts: {
        ...state.parts,
        accessories: state.parts.accessories.map((a) =>
          a.id === id ? { ...a, ...patch } : a,
        ),
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
