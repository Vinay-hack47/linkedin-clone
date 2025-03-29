import { ICommentDocument } from "@/models/comment.model";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import ReactTimeago from "react-timeago";


const Comment = ({ comment }: { comment: ICommentDocument }) => {
  return (
    <div className="flex gap-2 my-4">
      <div className="mt-2">
        <ProfilePhoto src={comment.user.profilePhoto!}></ProfilePhoto>
      </div>

      <div className="flex flex-1 justify-between p-2 bg-[#F2F2F2]">
        <div>
          <h1 className="text-sm font-medium">
            {`${comment.user.firstName} ${comment.user.lastName}`}
          </h1>
          <p className="text-xm text-gray-500">@{comment.user.lastName}</p>
          <p className="my-2">{comment.textMessage}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500"><ReactTimeago date={new Date(comment.createdAt)}></ReactTimeago></p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
