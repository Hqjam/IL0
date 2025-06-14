import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";
console.log("Environment variable MONGODB_URL =", process.env.MONGODB_URL);

const connectDB = async () => {
  try{
      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`MongoDB connected MOFO: ${connectionInstance.connection.host}`);
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
}
export default connectDB;