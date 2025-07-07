
import { IPostDocument } from '@/models/post.model';
import React from 'react';
import Comment from './Comment';
import { ICommentDocument } from '@/models/comment.model';


const Comments = ({ post }: { post: IPostDocument }) => {
  return (
    <div>
      {post.comments.map((comment) => {
        // comment may be a plain object or a populated document
        // so we assert the type for TS
        const typedComment = comment as ICommentDocument;
        return <Comment key={typedComment._id} comment={typedComment} />;
      })}
    </div>
  );
};

export default Comments
