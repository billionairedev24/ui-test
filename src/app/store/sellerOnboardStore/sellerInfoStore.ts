import { SellerInfoFormValidator } from "@/lib/validators/SellerInfoBioValidators";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SellerInfoSchema = {
  sellerInfo: SellerInfoFormValidator;
  setSellerInfoStore: (info: Partial<SellerInfoSchema["sellerInfo"]>) => void;
  setUseExistingSellerAddress: (
    passedBoolean: Partial<SellerInfoFormValidator["useExistingSellerAddress"]>
  ) => void;
  resetSellerInfoStore: () => void;
};

const defaultSellerInfo: SellerInfoFormValidator = {
  fName: "",
  lName: "",
  email: "",
  mName: "",
  useExistingSellerAddress: false,
  phoneNumber: "",
  country: "",
  residenceCountry: "",
  dob: new Date(),
  addressLine: "",
  zip: "",
  state: "",
  city: "",
  apartment: "",
};

export const useSellerInfoStore = create<SellerInfoSchema>()(
  persist(
    (set) => ({
      sellerInfo: defaultSellerInfo,
      setSellerInfoStore: (info) =>
        set((state) => ({ sellerInfo: { ...state.sellerInfo, ...info } })),
      setUseExistingSellerAddress: (passedBoolean) =>
        set((state) => ({
          sellerInfo: {
            ...state.sellerInfo,
            useExistingSellerAddress: passedBoolean,
          },
        })),
      resetSellerInfoStore: () =>
        set({
          sellerInfo: defaultSellerInfo,
        }),
    }),

    { name: "Seller Info Store" }
  )
);
