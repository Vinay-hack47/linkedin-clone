import Image from "next/image";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { getAllPosts } from "@/lib/serveractions";
import { User } from "@clerk/nextjs/server"; // ✅ Server-side type


const Sidebar = async ({ user }: { user: User | null }) => {
  const posts = await getAllPosts();
  return (
    <div className="hidden md:block w-[20%] h-fit border bordergray-300 bg-white rounded">
      <div className="flex relative flex-col items-center">
        {/* Banner */}
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/Banner.jpg"}
              alt="banner"
              width={300}
              height={300}
              className="w-full h-full rounded-t"
            />
          )}
        </div>
        {/* Profile Photo */}
        <div className="my-1 absolute top-10">
          <ProfilePhoto
            src={user ? user?.imageUrl : "/Banner.jpg"}
          ></ProfilePhoto>
        </div>

        {/* User Name */}
        <div className="border-b border-b-gray-300 ">
          <div className="p-2 mt-5 text-center">
            <h1>
              {user ? `${user.firstName} ${user.lastName}` : "Vin-hack47"}
            </h1>
            <p>@{user ? `${user?.username}` : "username"}</p>
          </div>
        </div>

        {/* About */}
        <div className="text-xs ">
          <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
            <p className="w-full ">Post Impresssion</p>
            <p className="text-blue-500 font-bold">200</p>
          </div>
          <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
            <p>Posts</p>
            <p className="text-blue-500 font-bold">
              {
                posts.length
              }
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
