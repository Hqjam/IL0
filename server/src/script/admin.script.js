import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Admin } from "../models/Admin.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const defaultAdmin = {
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const createMasterAdmin = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: defaultAdmin.email });
    if (existingAdmin) {
      console.log("⚠️ Master admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);

    const admin = new Admin({
      username: defaultAdmin.username,
      email: defaultAdmin.email,
      password: hashedPassword,
      adminType: "admin",
    });

    await admin.save();
    console.log("✅ Master admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating master admin:", err.message);
    process.exit(1);
  }
};

createMasterAdmin();
