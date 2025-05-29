import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

//post dislikes
// export const POST = async (req: NextRequest, {params}: {params:{postId:string}}) =>{
//   try {
//     await connectDB();
//     const userId = await req.json();
//     const post = await Post.findById({_id:params.postId});
//     if(!post) return NextResponse.json({error:'Post not found.'});
//     await post.updateOne({$pull:{likes:userId}});
//     return NextResponse.json({message:"Post disliked successfully."});
    
//   } catch (error:unknown) {
//     // return NextResponse.json({error:"An error occurred."});
//     console.log(error)
//    }
// }


// Dislike a post
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    // Get userId from the request body
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    // Extract postId from the URL
    const pathname = req.nextUrl.pathname;
    const match = pathname.match(/posts\/([^/]+)\/dislike/);
    const postId = match ? match[1] : null;

    if (!postId) {
      return NextResponse.json({ error: "Post ID not found in URL." }, { status: 400 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (error: unknown) {
    console.error("Dislike Post Error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
