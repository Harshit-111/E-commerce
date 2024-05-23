import mongoose from "mongoose";
import { type } from "os";
import { timestamp } from "rxjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requiered: true,
    },
    email: {
      type: String,
      requiered: true,
      unique: true,
    },
    password: {
      type: String,
      requiered: true,
    },
    isAdmin: {
      type: Boolean,
      requiered: true,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
