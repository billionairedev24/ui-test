import {z} from "zod";


export const ProductFormSchema = z.object({
    name: z.string().refine(val => val.trim() !== '', {
        message: 'Name is required'
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    price: z.string().refine((val) => val.trim() !== '', {
        message: 'Price cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Please enter a valid price. Price must be a valid number and greater than or equal to 0'
    }),
    status: z.string().min(1, {
        message: "Status is required.",
    }),
    images: z.array(z.string()).min(1, {
        message: "At least one image is required.",
    }),
    sku: z.string().min(1, {
        message: "SKU is required.",
    }),
    category: z.string().min(1, {
        message: "Category is required.",
    }),
    seller: z.string().optional(),
    tags: z.string(),
    weight: z.string().refine((val) => val.trim() !== '', {
        message: 'Weight cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Weight must be a valid number and greater than or equal to 0'
    }),
    packagingLength: z.string().refine((val) => val.trim() !== '', {
        message: 'Packaging length cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Packaging length must be a valid number and greater than or equal to 0'
    }),

    packagingHeight: z.string().refine((val) => val.trim() !== '', {
        message: 'Packaging height cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Packaging height must be a valid number and greater than or equal to 0'
    }),

    packagingWidth: z.string().refine((val) => val.trim() !== '', {
        message: 'Packaging width cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Packaging width must be a valid number and greater than or equal to 0'
    }),

    quantity: z.string().refine((val) => val.trim() !== '', {
        message: 'Quantity cannot be empty'
    }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Quantity must be a valid number and greater than or equal to 0'
    }),
})
export type ProductFormValidator = z.infer<typeof ProductFormSchema>;


export const ProductSchema = z.object({
    name: z.string().refine(val => val.trim() !== '', {
        message: 'Name is required'
    }),
    description: z.string().refine(val => val.trim() !== '', {
        message: 'Description is required'
    }),
    imageUrls: z.array(z.string())
        .min(1, {
            message: "Please upload required documents"
        }).max(3, {
            message: "A max of 3 documents can be uploaded"
        }).optional(),
    tags: z.string().refine(val => val.trim() !== '', {
        message: 'Tag is required'
    }),
    categoryId: z.string().refine(val => val.trim() !== '', {
        message: 'Category is required'
    }),
    status: z.string().optional(),
    isActive: z.boolean().optional(),
    sku: z.string().refine(val => val.trim() !== '', {
        message: 'SKU is required'
    }),
    marketId: z.string().optional(),
    vendorId: z.string().optional(),
    barcode: z.string().refine(val => val.trim() !== '', {
        message: 'Barcode is required'
    }),
    price: z.coerce.number().refine(val => val > 0, {
        message: 'Please enter a valid price.Price cannot be empty or less than 0'
    }),
    discount: z.coerce.number().refine(val => val > 0, {
        message: 'Discount cannot be less than 0'
    }).optional()
});

export type TProductValidator = z.infer<typeof ProductSchema>;