import { Admin } from "../models/Admin.model.js";
import { generateAdminToken } from "../util/generateTokens.js";


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

    const newAdmin = new Admin({ username, email, password });
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

    const Admin = await Admin.findOne({ email });
    if (!Admin || !(await Admin.isPasswordValid(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateAdminToken(Admin._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful",
      Admin: {
        id: Admin._id,
        Adminname: Admin.username,
        email: Admin.email,
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
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
