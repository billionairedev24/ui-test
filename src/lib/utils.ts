import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "@/components/ui/use-toast";
import {CartItem, HandleImageDelete, Product} from "@/types/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const USD_CURRENCY = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});


export const toTitleCase = (text: any) => {
    return text?.toLowerCase().replace(/\b\w/g, (char: any) => char.toUpperCase());
}

export const getInitials = (name: string) => {
    const names = name.split(' ')
    return names.map((n) => n.charAt(0).toUpperCase()).join("")
}


export const handleImageDelete:HandleImageDelete = (imageUrl, setImageUrls, isDeleting, setIsDeleting, form) => {
    setIsDeleting((prevDeletionStates) => ({...prevDeletionStates, [imageUrl]: true}));
    const imageKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
    fetch('/api/uploadthing/delete', {
        method: "POST",
        body: JSON.stringify({
            "imageKey": imageKey
        })
    }).then((res) => {
        if (res.ok) {
            setImageUrls((prevImageUrls) => {
                const newImageUrls = prevImageUrls.filter((url) => url!== imageUrl);
                form.setValue('imageUrls', newImageUrls);
                return newImageUrls;
            });
            setIsDeleting((prevDeletionStates) => ({...prevDeletionStates, [imageUrl]: false}));
        }
    }).catch((err) => {
        toast({
            variant: "destructive",
            description: `Unable to delete image. ${err.description}`
        })
    }).finally(() => setIsDeleting((prevDeletionStates) => ({...prevDeletionStates, [imageUrl]: false})))
}


export const createCartItem = (product: Product): CartItem => {
    return {
        ...product, // Spread all properties from Product
        quantity: 1 // Add quantity field
    };
}


