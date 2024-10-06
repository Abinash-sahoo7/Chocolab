import { create } from "zustand";

export type useNewProdcutTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProductState = create<useNewProdcutTypes>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
