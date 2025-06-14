import express from "express";
import { getBusinesses, getBusinessReviews } from "../controllers/business.controller.js";

const router = express.Router();

router.get("/", getBusinesses);  
router.get("/:id/reviews",getBusinessReviews)

export default router;