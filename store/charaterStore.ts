import { Accessory, AccessoryPreset, CharacterParts } from '@/types/character';
import { create } from 'zustand';

interface CharacterState {
  parts: CharacterParts;
  setPart: (key: keyof CharacterParts, value: string) => void;
  setAllparts: (parts: CharacterParts) => void;
  addAccessory: (accessory: AccessoryPreset) => void;
  removeAccessory: (id: string) => void;
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
  addAccessory: (preset: AccessoryPreset) => {
    set((state) => {
      // 이미 존재하면 추가하지 않음
      if (state.parts.accessories.some((a) => a.id === preset.id)) return state;

      return {
        parts: {
          ...state.parts,
          accessories: [
            ...state.parts.accessories,
            {
              id: preset.id,
              src: preset.src,
              x: 130,
              y: 130,
              width: 50,
              scale: 1,
            },
          ],
        },
      };
    });
  },
  removeAccessory: (id: string) =>
    set((state) => ({
      parts: {
        ...state.parts,
        accessories: state.parts.accessories.filter((a) => a.id !== id),
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
