import {RefinementCtx, z} from "zod";

export const BusinessInfoSchema = z.object({
    country: z.string({message: 'Please select your business location'}),
    businessType: z.string({message: 'Please select your business location'}),
    firstName: z.string({message: 'First name is required'}).optional(),
    lastName: z.string({message: 'Last name is required'}).optional(),
    middleName: z.string({message: 'Business name is required'}).optional(),
    attestation: z.boolean({message: 'Please verify that your information is correct'}),
    businessName: z.string().optional(),
}).superRefine((data, ctx: RefinementCtx) => {
    if (data.businessType === 'business' && !data.businessName) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Business name is required',
            path: ['businessName'],
        });
    }

    if (data.businessType !== 'business') {
        if (!data.firstName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'First name is required',
                path: ['firstName'],
            });
        }
        if (!data.lastName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Last name is required',
                path: ['lastName'],
            });
        }
    }
});

export type BusinessInfoValidator = z.infer<typeof BusinessInfoSchema>