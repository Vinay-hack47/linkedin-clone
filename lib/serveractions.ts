"use server"

import { Post } from "@/models/post.model"
import { IUser } from "@/models/user.model"
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";

  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

//creating post using server actions
export const createPostAction = async (inputText: string, selectedFile: string) => {

  //connect to the database
  await connectDB();
  
  const user = await currentUser()
  if(!user){
    throw new Error("User not authenticated")
  }
  if(!inputText){
    throw new Error("Input text is required")
  }

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName ?? "Vinay",
    lastName: user.lastName ?? "Mern Stack",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  
  let uploadResponse;

  try {
    if(image){
      // 1. create the post with image

      uploadResponse = await cloudinary.uploader.upload(image);

      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse.secure_url
      })
    }

    else{
      // 2. create the post without image
      await Post.create({
        description: inputText,
        user: userDatabase
      })
    }
    revalidatePath("/");
    
  } catch (error:any) {
    throw new Error(error)
  }
}  


//get all post using server actions
export const getAllPosts = async () =>{
  await connectDB();

  try {
    const posts = await Post.find().sort({createdAt: -1}).populate({path:"comments", options:{sort:{createdAt:-1}}});
    if(!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error: any) {
    throw new Error(error)
  }
}



//delete post by id
export const deletePost = async (postId:string) =>{
  await connectDB();

  const user = await currentUser();
  if(!user) throw new Error("User not authenticated");

  const post = await Post.findById(postId);
  if(!post) throw new Error("Post not found");

  //can delete his own post 
  if(post.user.userId !== user.id) {
    throw new Error("You are not the owner of this post")
  }

  try {
    await Post.deleteOne({_id:postId});
    revalidatePath("/")
  } catch (error:any) {
    throw new Error(error)
  }
}


//create comments by server action
// export const createCommentAction = async(postId: string, formData: FormData) =>{

//   try {
//     const user = await currentUser();
//     if(!user) throw new Error("User not authenticated");
//     const inputText = formData.get("inputText") as string;
//     if(!inputText) throw new Error("Field is required");
//     if(!postId) throw new Error("PostId is required");


//     const userDatabase: IUser = {
//       firstName: user.firstName ?? "Vinay",
//       lastName: user.lastName ?? "Mern Stack",
//       userId: user.id,
//       profilePhoto: user.imageUrl,
//     };
//     const post = await Post.findById({_id:postId});
//     if(!post) throw new Error("Post not found");

//     const comment = await Comment.create({
//       textMessage:inputText,
//       user:userDatabase,
//     });

//     post.comments?.push(comment?._id);
//     await post.save();

//     revalidatePath("/");

//   } catch (error: any) {
//     throw new Error("An error occurred.")
//   }
// }



// filepath: f:\Full Stack Web Development\Coding Stuff\Projects\NextJs-Projects\Linked Clone\linkedin\lib\serveractions.ts
export const createCommentAction = async (postId: string, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Field is required");
    if (!postId) throw new Error("PostId is required");

    const userDatabase = {
      firstName: user.firstName ?? "Vinay",
      lastName: user.lastName ?? "Mern Stack",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    post.comments?.push(comment?._id);
    await post.save();

    revalidatePath("/");
  } catch (error) {
    console.error("Error in createCommentAction:", error); // Log the actual error
    throw new Error("An error occurred.");
  }
};