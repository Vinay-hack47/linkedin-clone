import React from "react";
import Post from "./Post";
import { IPostDocument } from "@/models/post.model";

const Posts = ({ posts }: { posts: IPostDocument[] }) => {
  // if (!posts || posts.length === 0) return <p>No posts available</p>;

  return (
    <div>
      {posts.map((post) => {
        return <Post key={post._id} post={post}></Post>;
      })}
    </div>
  );
};

export default Posts;
