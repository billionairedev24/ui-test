import { z } from "zod";

export const PaymentSchema = z.object({
name: z.string(),
    businessName: z.string(),
    businessAddress: z.string(),
    isAddressSame: z.string(),
    billingName: z.string(),
    billingAddress: z.string(),
    paymentMethod: z.string(),
})

export type TPaymentFormValidator = z.infer<typeof PaymentSchema>