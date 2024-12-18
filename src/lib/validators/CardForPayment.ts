import { z } from "zod";
import { trimmedString } from "./BusinessInfoValidator";

export const CardForPaymentForm = z.object({
    cardNumber: trimmedString(10),
    expiryDate: z.date(),
    holderName: z.string()
})