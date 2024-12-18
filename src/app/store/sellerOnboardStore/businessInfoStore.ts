import { BusinessFormValidator } from "@/lib/validators/BusinessInfoValidator";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BusinessStoreSchema = {
  businessInfo: BusinessFormValidator;
  setUseExistingBusinessAddress: (
    passedBoolean: Partial<BusinessFormValidator["useExistingBusinessAddress"]>
  ) => void;
  setUseExistingBusinessPhoneNumber: (
    passedBoolean: Partial<
      BusinessFormValidator["useExistingBusinessPhoneNumber"]
    >
  ) => void;
  setBusinessInfo: (info: Partial<BusinessStoreSchema["businessInfo"]>) => void;
  resetBusinessInfo: () => void;
};

export const useBusinessInfoStore = create<BusinessStoreSchema>()(
  persist(
    (set) => ({
      businessInfo: {
        businessName: "",
        companyRegNumber: "",
        country: "",
        useExistingBusinessAddress: false,
        useExistingBusinessPhoneNumber: true,
        addressLine: undefined,
        zip: "",
        state: "",
        city: "",
        apartment: "",
        countryPhoneCode: "ca",
        phoneNumber: "",
      },
      setUseExistingBusinessAddress: (passedBoolean) =>
        set((state) => ({
          businessInfo: {
            ...state.businessInfo,
            useExistingBusinessAddress: passedBoolean,
          },
        })),
      setUseExistingBusinessPhoneNumber: (passedBoolean) =>
        set((state) => ({
          businessInfo: {
            ...state.businessInfo,
            useExistingBusinessPhoneNumber: passedBoolean,
          },
        })),
      setBusinessInfo: (info) =>
        set((state) => ({
          businessInfo: { ...state.businessInfo, ...info },
        })),
      resetBusinessInfo: () =>
        set({
          businessInfo: {
            businessName: "",
            companyRegNumber: "",
            country: "",
            useExistingBusinessAddress: false,
            useExistingBusinessPhoneNumber: false,
            addressLine: "",
            zip: "",
            state: "",
            city: "",
            apartment: "",
            countryPhoneCode: "ca",
            phoneNumber: "",
          },
        }),
    }),
    {
      name: "Business Info Store",
    }
  )
);
