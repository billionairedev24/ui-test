import { SellerInfoBankValidator } from "@/lib/validators/SellerBankInfoValidator";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type VerifyBankSchema = {
  bankDetails: SellerInfoBankValidator;
  setBankDetails: (info: Partial<VerifyBankSchema["bankDetails"]>) => void;
  resetBankDetails: () => void;
};

export const useVerifyBankStore = create<VerifyBankSchema>()(
  persist(
    (set) => ({
      bankDetails: {
        bankHolderName: "",
        country: "",
        financialInstitution: "",
        routingNumber: "",
        bankAccountNumber: "",
        reBankAccountNumber: "",
      },
      setBankDetails: (info) =>
        set((state) => ({ bankDetails: { ...state.bankDetails, ...info } })),
      resetBankDetails: () => ({
        bankDetails: {
          bankHolderName: undefined,
          country: undefined,
          financialInstitution: undefined,
          routingNumber: undefined,
          bankAccountNumber: undefined,
          reBankAccountNumber: undefined,
        },
      }),
    }),

    { name: "Verify Bank Store" }
  )
);
