import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Loader2, XCircle} from "lucide-react";
import {UploadButton} from "@/lib/uploadthing/uploadthing";
import {toast} from "@/components/ui/use-toast";
import Link from "next/link";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {HandleImageDelete, IsDeletingState} from "@/types/types";
import {TProductValidator} from "@/lib/validators/product-validator";


interface DocUploadProps {
    form:  UseFormReturn<TProductValidator>; // Replace 'any' with the appropriate type if you have specific form values
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    isDeleting: IsDeletingState
    setIsDeleting: React.Dispatch<React.SetStateAction<IsDeletingState>>;
    label: string;
    handleImageDelete: HandleImageDelete;
}

const DocUpload: React.FC<DocUploadProps> = ({
                                                 form,
                                                 imageUrls,
                                                 setImageUrls,
                                                 isDeleting,
                                                 handleImageDelete,
                                                 setIsDeleting,
                                                 label
                                             }) => {
    return (
        <div className="grid gap-2">
            <FormField
                control={form.control}
                name="imageUrls"
                render={() => (
                    <FormItem defaultValue={imageUrls}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            {imageUrls.length > 0 ? (
                                <div className={`grid grid-cols-${imageUrls.length} gap-4`}>
                                    {imageUrls.map((imageUrl, index) => (
                                        <div key={index} className="relative max-h-[100px] min-w-[100px] gap-4">
                                            <Link href={imageUrl} prefetch={false} target="_blank"
                                                  rel="noopener noreferrer">
                                                <Image
                                                    src={imageUrl}
                                                    alt="Item image"
                                                    width={50}
                                                    height={50}
                                                    className="w-full h-full w-50 object-contain"
                                                />
                                            </Link>

                                            <Button
                                                onClick={() => handleImageDelete(imageUrl, setImageUrls, isDeleting, setIsDeleting, form)}
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-[-12px] top-0"
                                            >
                                                {isDeleting[imageUrl] ? <Loader2/> : <XCircle/>}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center w-full p-12 border-2 border-dashed"
                                >
                                    <UploadButton
                                        appearance={{
                                            container: "dark:border-gray-200",
                                            button: "bg-slate-600",
                                            allowedContent: "text-red-600",
                                        }}
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            setImageUrls((images) => {
                                                //@ts-ignore
                                                const newImageUrls = [...images, ...res.map((item) => item.url)];
                                                form.setValue('imageUrls', newImageUrls);
                                                return newImageUrls;
                                            });
                                            console.log('imageUrls status', JSON.stringify(form.getValues()))
                                            toast({
                                                variant: "success",
                                                description: "Upload Complete",
                                            });
                                        }}
                                        onUploadError={(error) => {
                                            toast({
                                                variant: "destructive",
                                                description: `Upload failed with error: ${error.message}`,
                                            });
                                        }}
                                    />
                                </div>
                            )}
                        </FormControl>
                        <FormMessage/>
                        <FormDescription/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default DocUpload;