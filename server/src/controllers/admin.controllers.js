import { Admin } from "../models/Admin.model.js";
import { generateAdminToken } from "../util/generateTokens.js";
import bcrypt from "bcrypt";


export const registerAdmin = async (req, res) => {
  try {
    const { username,email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, email, password:hashedPassword });
    await newAdmin.save();

    generateAdminToken(newAdmin._id, res);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      Admin: {
        id: newAdmin._id,
        Adminname: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email,password)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log(admin)

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    console.log(password,admin.password)
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    generateAdminToken(admin._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        adminName: admin.username,
        email: admin.email,
        adminType: admin.adminType || "admin",
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};




export const logoutAdmin = async (req, res) => {
 try {
    res.cookie("admin_jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};





export const addModerator = async (req, res) => {
  const {  username,email, password } = req.body;

  try {
    if (req.admin.adminType !== "admin") {
      return res
        .status(401)
        .json({ message: "Only master admins can add moderators" });
    }

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists, login instead" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newModerator = new Admin({
      username,
      email,
      hashedPassword,
      adminType: "moderator",
    });
    await newModerator.save();

    res
      .status(201)
      .json({
        message: "Moderator added successfully",
        moderator: newModerator,
      });
  } catch (error) {
    console.log("Error in addModerator:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const checkAdminAuth = async (req, res) => {
  try {
    res.status(200).json(req.admin);
  } catch (error) {
    console.log("error in checkAdminAuth controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
