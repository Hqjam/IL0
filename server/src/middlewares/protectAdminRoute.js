import jwt from "jsonwebtoken";
import {Admin} from "../models/Admin.model.js";


export const protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.cookies.admin_jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.log("Error in protectAdminRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};