import {z} from "zod";

export const UserSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        firstName: z.string({
            message: "Firstname is required"
        }).min(1, {
            message: "Please enter firstname"
        })
            .max(50, {
                message: "Firstname must not exceed 50 characters",
            }),
        lastName: z
            .string({
                message: "Lastname is required"
            }).min(1, {
                message: "Please enter lastname"
            })
            .max(50, {
                message: "Lastname must not exceed 50 characters",
            }),
        password: z.string().min(8, {
            message: "Password must be a minimum of 8 characters",
        }),
        rePassword: z.string().min(8, {
            message: "Password must be a minimum of 8 characters",
        }),
        role: z.string().min(1, {message: "Role can not be null or empty."})
    })
    .refine((data) => data.rePassword === data.password, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });

export type TUserSchemaValidator = z.infer<typeof UserSchema>;