import {z} from "zod";

export const OtpSchema = z.object({
    otp: z.string().length(6).regex(/^\d+$/, 'OTP must contain only digits')
})

export type OtpValidator = z.infer<typeof OtpSchema>