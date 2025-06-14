import express from "express";
import { checkUserAuth, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { protectUserRoutes } from "../middlewares/protectUserRoutes.js";

const router = express.Router();

router.post("/register", registerUser);  
router.post("/login", loginUser); 
router.post("/logout", logoutUser);
router.get("/check-auth", protectUserRoutes, checkUserAuth);


export default router;