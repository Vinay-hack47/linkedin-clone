// "use client"

// import React from "react";
// import ProfilePhoto from "./ProfilePhoto";
// import { currentUser } from "@clerk/nextjs/server";
// import { Button } from "./ui/button";
// import { Trash2 } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { IPostDocument } from "@/models/post.model";
// import PostContent from "./PostContent";
// import SocialOptions from "./SocialOptions";
// import ReactTimeAgo from "react-time-ago";
// import { deletePost } from "@/lib/serveractions";
// import { useUser } from "@clerk/nextjs";

// const Post = ({ post }: { post: IPostDocument }) => {
//   // const user = await currentUser();
//   const { user } = useUser();

//   const fullName = post?.user?.firstName + "" + post?.user?.lastName;

//   // const fullName = `${post?.user?.firstName || ""} ${post?.user?.lastName || ""}`.trim();

//   const loggedInUser = user?.id === post?.user?.user_id;
//   return (
//     <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
//       <div className="flex gap-2 p-4">
//         <ProfilePhoto src={post?.user?.profilePhoto}></ProfilePhoto>
//         <div className="flex items-center justify-between w-full ">
//           <div>
//             <h1 className="text-sm font-bold gap-2">
//               {fullName}{" "}
//               <Badge className="ml-2" variant={"secondary"}>
//                 You
//               </Badge>
//             </h1>
//             <p className="text-xs text-gray-500">
//               @{user ? user?.username : "username"}
//             </p>
//             {/* <p className="text-xs text-gray-500">@{post?.user?.username || "username"}</p> */}

//             <p className="text-xs text-gray-500">1hr ago</p>
//           </div>
//         </div>
//         <div>
//           {loggedInUser && (
//             //   <Button onClick={() =>{ const res = deletePost(post?._id)}} size={"icon"} className="rounded-full" variant={"outline"}>
//             //   <Trash2></Trash2>
//             // </Button>
//             <Button size={"icon"} className="rounded-full" variant={"outline"}>
//               <Trash2></Trash2>
//             </Button>
//           )}
//         </div>
//       </div>

//       <PostContent post={post}></PostContent>
//       <SocialOptions></SocialOptions>
//     </div>
//   );
// };

// export default Post;




"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { Badge } from './ui/badge'
import { IPostDocument } from '@/models/post.model'
import PostContent from './PostContent'
import SocialOptions from './SocialOptions'
import ReactTimeago from "react-timeago";
import ProfilePhoto from './ProfilePhoto'
import { deletePost } from '@/lib/serveractions'

const Post = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;

    return (
        <div className='bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300'>
            <div className=' flex gap-2 p-4'>
                <ProfilePhoto src={post?.user?.profilePhoto} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold'>{fullName} <Badge variant={'secondary'} className='ml-2'>You</Badge></h1>
                        <p className='text-xs text-gray-500'>@{user ? user?.username : "username"}</p>

                        <p className='text-xs text-gray-500'>
                            <ReactTimeago date={new Date(post.createdAt)} />
                        </p>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser && (
                            <Button onClick={() => {
                                const res = deletePost(post._id);
                            }} size={'icon'} className='rounded-full cursor-pointer' variant={'outline'}>
                                <Trash2 />
                            </Button>
                        )
                    }
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post={post}/>
        </div>
    )
}

export default Post