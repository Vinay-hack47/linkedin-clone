"use client"
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serveractions";

const CommentInput = ({ postId }: { postId: string }) => {
  const {user} = useUser();

  const commentActionHandler = async(formData:FormData) =>{
    try {
      if(!user) throw new Error("User not authenticated");

      await createCommentAction(postId,formData)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form action={(formData) => commentActionHandler(formData)}>
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user?.imageUrl}></ProfilePhoto>
        <Input
        type="text"
        name="inputText"
        placeholder="Add a comment"
        className="rounded-full"
        ></Input>
        <Button type="submit" variant={"outline"}>Comment</Button>
      </div>
    </form>
  );
};

export default CommentInput;
