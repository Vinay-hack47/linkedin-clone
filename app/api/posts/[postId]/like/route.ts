import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

//get likes

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const { pathname } = req.nextUrl;
    const match = pathname.match(/posts\\([^/]+)\\like/);
    const postId = match ? match[1] : null;
    if (!postId) {
      return NextResponse.json({ error: "Post ID not found in URL." }, { status: 400 });
    }
    const post = await Post.findById({ _id: postId });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post.likes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};


//post likes
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const userId = await req.json();
    const { pathname } = req.nextUrl;
    const match = pathname.match(/posts\\([^/]+)\\like/);
    const postId = match ? match[1] : null;
    if (!postId) {
      return NextResponse.json({ error: "Post ID not found in URL." }, { status: 400 });
    }
    const post = await Post.findById({ _id: postId });
    if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    await post.updateOne({ $addToSet: { likes: userId } });
    return NextResponse.json({ message: "Post liked successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};