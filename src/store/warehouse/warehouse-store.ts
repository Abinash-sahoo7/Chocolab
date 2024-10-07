import { create } from "zustand";

export type useNewWarehouseTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewWarehouseState = create<useNewWarehouseTypes>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
