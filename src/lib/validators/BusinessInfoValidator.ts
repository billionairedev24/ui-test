import { z } from "zod";

// Helper Function for common string validation
export const optionalField = () => {
  return z.string().optional();
};
export const trimmedString = (
  minLength: number,
  requiredMessage = "Required"
) => {
  return z
    .string({ required_error: requiredMessage })
    .refine((val) => val !== "", { message: requiredMessage })
    .refine((val) => val.length >= minLength, {
      message: `Must be at least ${minLength} characters`,
    });
};

export const BusinessFormSchema = z
  .object({
    businessName: trimmedString(3),
    companyRegNumber: trimmedString(5),
    useExistingBusinessAddress: z.boolean().default(false),
    useExistingBusinessPhoneNumber: z.boolean().default(false),
    country: optionalField(),
    addressLine: optionalField(),
    zip: optionalField(),
    state: optionalField(),
    city: optionalField(),
    apartment: optionalField(),
    countryPhoneCode: optionalField(),
    phoneNumber: optionalField()

    
  })
  .superRefine((val, ctx) => {
    if (!val.useExistingBusinessAddress) {
      if (!val.country || val.country.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["country"],
        });
      }

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
    if (!val.useExistingBusinessPhoneNumber) {
      if (!val.phoneNumber || val.phoneNumber.length <= 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required",
          path: ["phoneNumber"],
        });
      }
    }
  });

export type BusinessFormValidator = z.infer<typeof BusinessFormSchema>;
