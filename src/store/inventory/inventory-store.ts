import { create } from "zustand";

export type useNewInventoryTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewInventoryState = create<useNewInventoryTypes>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
