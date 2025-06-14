import express from "express";
import { getBusinesses, addBusiness } from "../controllers/business.controller.js";

const router = express.Router();

router.get("/", getBusinesses); 
router.post("/", addBusiness);  

export default router;