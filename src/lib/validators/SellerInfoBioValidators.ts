import { z } from "zod";
import { optionalField, trimmedString } from "./BusinessInfoValidator";
const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;

export const SellerInfoForm = z
  .object({
    fName: trimmedString(3),
    mName: z.string().optional(),
    lName: trimmedString(3),
    email: z.string().email(),
    phoneNumber: z.string().refine((value) => phoneNumberRegex.test(value), {
      message: "Enter a valid email or phone number",
    }),
    useExistingSellerAddress: z.boolean().default(false),
    country: trimmedString(2),
    addressLine: optionalField(),
    zip: optionalField(),
    state: optionalField(),
    city: optionalField(),
    apartment: optionalField(),
    residenceCountry: trimmedString(2, "Country is required"),
    dob: z.date(),
  })
  .superRefine((val, ctx) => {
    if (!val.useExistingSellerAddress) {
      if (
        !val.addressLine ||
        val.addressLine === "" ||
        val?.addressLine?.length < 4
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address line is required",
          path: ["addressLine"],
        });
      }
      if (
        !val.apartment ||
        val.apartment === "" ||
        val?.apartment?.length < 4
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Apartment is required",
          path: ["apartment"],
        });
      }
      if (!val.zip || val.zip.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ZIP / Postal code is required",
          path: ["zip"],
        });
      }

      if (!val.state || val.state.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required",
          path: ["state"],
        });
      }

      if (!val.city || val.city.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required",
          path: ["city"],
        });
      }
    }
  });

export type SellerInfoFormValidator = z.infer<typeof SellerInfoForm>;
