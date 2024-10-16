import { create } from "zustand";

export type useNewDeliveryPersonTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewDeliveryPersonState = create<useNewDeliveryPersonTypes>(
  (set) => {
    return {
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
    };
  }
);
