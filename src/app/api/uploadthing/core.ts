import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    pdfUploader: f({pdf: {maxFileSize: "4MB"}})
        .onUploadComplete(async({file}) => {}),

    imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 3 } })
        .onUploadError( async({error}) => {
            console.log(`Some error ${error.message}`)
        })
        .onUploadComplete(async ({ file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete ");

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { status: "success" };
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;