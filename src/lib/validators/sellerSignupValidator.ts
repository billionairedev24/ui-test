import {z} from "zod";
import {Role} from "@/types/types";

const RoleSchema = z.nativeEnum(Role).optional();

export const SellerSchema = z
    .object({
        address1: z.string({
            message: "Address1 is required"
        }).min(10, {
            message: "Address 1 is required and should not be less than 10 characters",
        }),
        address2: z.string().optional(),
        username: z.string({
            message: "Email is required"
        }).min(1, {
            message: "Email is required"
        })
            .email({
                message: "Please enter a valid Email",
            }),
        country: z.string({
            message: "Country is required"
        }).min(1, {
            message: "Please select your Country"
        }),
        state: z.string({
            message: "State is required"
        }).min(1, {
            message: "Please select your State"
        }),
        city: z.string({
            message: "City is required"
        }).min(1, {
            message: "Please select your City"
        }),
        zip: z.string({
            message: "Zip is required"
        }).min(1, {
            message: "Please enter your zip code"
        }),
        imageUrls: z.array(z.string())
            .min(1, {
                message: "Please upload required documents"
            }).max(3, {
                message: "A max of 3 documents can be uploaded"
            }).optional(),
        firstname: z.string({
            message: "Firstname is required"
        }).min(1, {
            message: "Please enter firstname"
        })
            .max(50, {
                message: "Firstname must not exceed 50 characters",
            }),
        phone: z.string().min(10, {
            message: "Phone must not be less than 10 digits",
        }),
        businessName: z
            .string({
                message: "Business name is required"
            }).min(5, {
                message: "Business nam cannot be les than 5 characters"
            })
            .max(40, {
                message: "Business name must not exceed 40 characters",
            }),
        lastname: z
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
        notes: z.string().max(100, {
            message: "Notes can not exceed 100 characters",
        }).optional(),
        role: RoleSchema
    })
    .refine((data) => data.rePassword === data.password, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });

export type TSellerSignupValidator = z.infer<typeof SellerSchema>;