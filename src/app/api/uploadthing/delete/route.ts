import {UTApi} from "uploadthing/server";
import {NextResponse} from "next/server";

const utApi = new UTApi

export const POST = async (req: Request) => {
    //ToDo: authenticate
    //const { userId } = auth()

   // if(!userId) return new NextResponse("Unauthorized")
    
    const {imageKey} = await req.json()
    try {
        const res = await utApi.deleteFiles(imageKey)
        return NextResponse.json(res)

    }catch(err) {
        console.log('Error deleting image', err)
        return new NextResponse("Internal Error")
    }

}
