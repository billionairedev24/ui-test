import { create } from "zustand";
import { persist } from "zustand/middleware";

export type businessType = {
  businessType: string;
  setBusinessType: (businessTypeArg: string) => void;
};

export const useBusinessTypeStore = create<businessType>()(
  persist(
    (set) => ({
      businessType: "",
      setBusinessType: (businessTypeArg) => {
        set((state) => ({
          businessType: businessTypeArg,
        }));
      },
    }),
    {
      name: "Business Type Store",
    }
  )
);
