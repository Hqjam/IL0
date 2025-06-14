import express from "express";
import { addModerator, checkAdminAuth, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controllers.js";
import { protectAdminRoute } from "../middlewares/protectAdminRoute.js";

const router = express.Router();


router.post("/login", loginAdmin); 
router.post("/logout", logoutAdmin);
router.get("/check-auth",protectAdminRoute,checkAdminAuth);
router.post("/moderator" ,addModerator);

export default router;