import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["restaurant", "cafe", "shop", "salon"], 
  },
  location: {
    city: { 
      type: String, 
      required: true,
      enum: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"], 
    },
    address: { type: String, required: true },
  },
}, { timestamps: true });

export const Business = mongoose.model("Business", businessSchema);