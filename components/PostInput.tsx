"use client"

import React, { useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";
import { User } from "@clerk/nextjs"; 

const PostInput = ({ user }: { user: User | null }) => {

  const [open, setOpen] = useState(false);

  const inputHandler = () => {
    setOpen(true);
  };
  
  return (
    <div className="bg-white p-4 m-2 md:m-0 border rounded-lg border-gray-300">
      <div className="flex item-center gap-3">
        <ProfilePhoto src={user?.imageUrl}></ProfilePhoto>

        <Input
          type="text"
          placeholder="Start a post"
          className="rounded-full hover:bg-gray-300 h-12 cursor-pointer"
          onClick={inputHandler}
        />
        <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl}></PostDialog>
      </div>
    </div>
  );
};

export default PostInput;
