import mongoose, { Model } from "mongoose";
import { IUser } from "./user.model";

export interface IComment {
  textMessage: string;
  user: IUser;
}

export interface ICommentDocument extends IComment, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
const commentSchema = new mongoose.Schema<ICommentDocument>(
  {
    textMessage: { type: String, required: true },
    user:{
      userId:{
        type:String,
        required:true
      },
      profilePhoto:{
        type:String,
        required:true
      },
      firstName:{
        type:String,
        required:true
      },
      lastName:{
        type:String,
        required:true
      }
    }
  },
  { timestamps: true }
);

export const Comment: Model<ICommentDocument> = mongoose.models?.Comment ||
mongoose.model<ICommentDocument>('Comment', commentSchema);
