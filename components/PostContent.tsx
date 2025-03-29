import { IPostDocument } from '@/models/post.model'
import Image from 'next/image';
import React from 'react'

const PostContent = ({post} : {post:IPostDocument}) => {
  
  return (
    <>
    <div className='my-3'>
      <p>{post?.description}</p>
    </div>

    {
      post?.imageUrl && (
        <Image
        src={post?.imageUrl}
        width={500}
        height={500}
        alt="post-image"
        className="w-full mx-auto"
        ></Image>
      )
    }
    </>
  )
}

export default PostContent
