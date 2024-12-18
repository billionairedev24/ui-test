"use client"

import React, {useState, useEffect, Suspense} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {X, Upload,} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent} from "@/components/ui/card"
import SubmitButton from "@/components/util/SumitButton";
import {ProductFormSchema, ProductFormValidator} from "@/lib/validators/product-validator";
import Image from "next/image";
import {useFindAllCategoriesSuspenseQuery} from "@/app/generated/graphql-types";


// Mock API calls (unchanged)
/*const fetchCategories = () => new Promise<string[]>(resolve =>
    setTimeout(() => resolve(["Electronics", "Clothing", "Home & Garden", "Books", "Toys"]), 500)
);*/


const fetchSKUs = () => new Promise<string[]>(resolve =>
    setTimeout(() => resolve(["SKU001", "SKU002", "SKU003", "SKU004", "SKU005"]), 500)
);

const fetchSellers = () => new Promise<string[]>(resolve =>
    setTimeout(() => resolve(["Seller1", "Seller2", "Seller3", "Seller4", "Seller5"]), 500)
);

const isAdmin = () => new Promise<boolean>(resolve =>
    setTimeout(() => resolve(true), 500)
);

const uploadImage = (file: File) => new Promise<string>(resolve => {
    setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    }, 500);
});


const CreateProduct = () => {

    const {data: categories} = useFindAllCategoriesSuspenseQuery();

    const [skus, setSKUs] = useState<string[]>([])
    const [sellers, setSellers] = useState<string[]>([])
    const [isAdminUser, setIsAdminUser] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProductFormValidator>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            status: "",
            images: [],
            sku: "",
            category: "",
            seller: "",
            tags: "",
            weight: "",
            packagingLength: "",
            packagingHeight: "",
            packagingWidth: "",
            quantity: "",
        }
    })


    const onSubmit = async (data: ProductFormValidator) => {
        setIsLoading(true)
        console.log(JSON.stringify(data))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchSKUs().then(setSKUs)
        fetchSellers().then(setSellers)
        isAdmin().then(setIsAdminUser)

    }, [])


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validFiles = Array.from(files).filter(file => {
                const maxSize = 1024 * 1024 * 5; // 5MB
                if (file.size > maxSize) {
                    console.error(`File ${file.name} is too large. Maximum allowed size is 5MB.`);
                    return false;
                }
                return true;
            });

            if (validFiles.length > 0) {
                const newImages = await Promise.all(validFiles.map(file => uploadImage(file)));
                setUploadedImages(prev => [...prev, ...newImages]);
                form.setValue('images', [...uploadedImages, ...newImages]);
            }
        }
    };

    const handleImageDelete = (index: number) => {
        const newImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newImages);
        form.setValue('images', newImages);
    };

    return (

        <div className="flex-1 mx-auto p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product name" {...field} className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter price" {...field} className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select status"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sku"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select SKU"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {skus.map((sku) => (
                                                        <SelectItem key={sku} value={sku}>
                                                            {sku}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select category"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.findAllCategories?.map((category) => {
                                                        if (category) {
                                                            return (
                                                                <SelectItem key={category.id}
                                                                            value={category.name}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            );
                                                        }

                                                    })}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                {isAdminUser && (
                                    <FormField
                                        control={form.control}
                                        name="seller"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Seller</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select seller"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {sellers.map((seller) => (
                                                            <SelectItem key={seller} value={seller}>
                                                                {seller}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter tags (comma-separated)" {...field}
                                                       className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Weight (kg)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter weight" {...field} className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="packagingLength"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Package Length (cm)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter package length" {...field}
                                                       className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="packagingHeight"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Packaging Height (cm)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter packaging height" {...field}
                                                       className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="packagingWidth"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Package Width (cm)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter package width" {...field} className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Stock Quantity</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter stock quantity" {...field}
                                                       className="w-full"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter product description"
                                                className="resize-none w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="images"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file"
                                                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                        <div
                                                            className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <Upload className="w-8 h-8 mb-4 text-gray-500"/>
                                                            <p className="mb-2 text-sm text-gray-500"><span
                                                                className="font-semibold">Click to upload</span> or drag
                                                                and drop</p>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to
                                                                10MB</p>
                                                        </div>
                                                        <Input id="dropzone-file" type="file" className="hidden"
                                                               onChange={handleImageUpload} multiple accept="image/*"/>
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {uploadedImages.map((image, index) => (
                                                        <div key={index} className="relative group">
                                                            <Image src={image} alt={`Uploaded ${index + 1}`}
                                                                   className="w-full h-32 object-cover rounded-lg"/>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleImageDelete(index)}
                                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X size={16}/>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="items-center p-6 pt-0 flex justify-end gap-2">
                                <Button className="w-38" type="reset" onClick={() => form.reset()}
                                        variant="outline">Cancel</Button>
                                <SubmitButton isLoading={isLoading}
                                              title={isLoading ? "Creating Product..." : "Create Product"}
                                              classItems="w-38"/>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProduct




