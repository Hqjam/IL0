import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    quality: { type: Number, required: true, min: 1, max: 5 },
    service: { type: Number, required: true, min: 1, max: 5 },
    value: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    photo:{
      type:String,
    }
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
