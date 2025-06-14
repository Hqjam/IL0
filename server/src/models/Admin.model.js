import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    adminType:{
        type: String,
        enum:["admin","moderator"],
        default:"moderator"
    }
  },
  { timestamps: true }
);




export const Admin=mongoose.model("Admin", adminSchema);