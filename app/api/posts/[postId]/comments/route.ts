import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// fetch all comments
// export const GET = async (req:NextRequest, {params}:{params:{postId:string}}) => {
//     try {
//         await connectDB();
//         const post = Post.findById({_id:params.postId});
//         if(!post) return NextResponse.json({error:"Post not found."});

//         const comments = await post.populate({
//             path:'comments',
//             options:{sort:{createdAt:-1}},
//         });
//         return NextResponse.json(comments);
//     } catch (error: unknown) {
//         // return NextResponse.json({error:'an error occurred.'});
//         console.log(error);
        
//     }
// }



// fetch all comments
export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const { pathname } = req.nextUrl;
        // Extract postId from the pathname, e.g. /api/posts/[postId]/comments
        const match = pathname.match(/posts\/([^/]+)\/comments/);
        const postId = match ? match[1] : null;
        if (!postId) {
            return NextResponse.json({ error: "Post ID not found in URL." }, { status: 400 });
        }

        const post = await Post.findById({ _id: postId }).populate({
            path: "comments",
            options: { sort: { createdAt: -1 } },
        });
        if (!post) {
            return NextResponse.json({ error: "Post not found." }, { status: 404 });
        }
        return NextResponse.json(post.comments);
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
};