import { z } from "zod";

export const CheckoutSchema = z.object({
    name: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string()

})

export type CheckoutValidator = z.infer<typeof CheckoutSchema>