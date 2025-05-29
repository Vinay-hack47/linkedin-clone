import React from 'react'
import Posts from './Posts'
import PostInput from './PostInput'
import { getAllPosts } from '@/lib/serveractions'


const Feed = async({user}: {user:unknown}) => {
  const userData = JSON.parse(JSON.stringify(user))
  
  

  const posts = await getAllPosts();
 

  return (
    <div className='flex-1'>
      <PostInput user={userData}></PostInput>
      <Posts posts ={posts!}></Posts>
    </div>
  )
}

export default Feed
