import { z } from "zod";
import { trimmedString } from "./BusinessInfoValidator";

export const SellerInfoBank = z
  .object({
    bankHolderName: z.string(),
    country: z.string(),
    financialInstitution: z.string(),
    routingNumber: trimmedString(9, "Routing number must be at least 9 digits"),
    bankAccountNumber: trimmedString(10, "Incomplete bank account number"),
    reBankAccountNumber: z.string(),
  })
  .refine((data) => data.bankAccountNumber === data.reBankAccountNumber, {
    message: "Bank account numbers don't match",
    path: ["reBankAccountNumber"],
  });

export type SellerInfoBankValidator = z.infer<typeof SellerInfoBank>;
