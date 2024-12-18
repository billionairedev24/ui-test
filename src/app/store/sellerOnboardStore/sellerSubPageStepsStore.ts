import { create } from "zustand";
type useSellerSubPageStepsProps = {
  sellerSubPageStep: number;
  incSellerSubPageStep: () => void;
  decSellerSubPageStep: () => void;
  resetSellerSubSteps: () => void;
};

export const useSellerSubPageSteps = create<useSellerSubPageStepsProps>()(
  (set) => ({
    sellerSubPageStep: 0,
    incSellerSubPageStep: () =>
      set((state) => ({
        ...state,
        sellerSubPageStep: state.sellerSubPageStep + 1,
      })),
    decSellerSubPageStep: () =>
      set((state) => ({
        ...state,
        sellerSubPageStep: state.sellerSubPageStep - 1,
      })),
    resetSellerSubSteps: () =>
      set((state) => ({ ...state, sellerSubPageStep: 0 })),
  })
);
