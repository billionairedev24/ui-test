import {z} from "zod";

export const LoginSchema = z.object({
    loginId: z.string().refine(
        (value) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        },
        {
            message: 'Please enter a valid email or phone number',
        }
    ),
    password: z.string().min(8, {message: "Password must be a minimum of 8 characters"}),
    remember_me: z.boolean().optional(),
})

export type LCredentialValidator = z.infer<typeof LoginSchema>