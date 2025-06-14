import express from "express";
import { protectUserRoutes } from "../middlewares/protectUserRoutes.js";
import { protectAdminRoute } from "../middlewares/protectAdminRoute.js";
import { acceptReview, addReviews, getPendingReviews, getUserReviews, rejectReview } from "../controllers/reviews.controllers.js";
import { uploadReviewPhoto } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/",protectUserRoutes, getUserReviews); 
router.post("/:id",protectUserRoutes,uploadReviewPhoto.single("photo"), addReviews);  
router.get("/pending",protectAdminRoute,getPendingReviews)
router.patch("/accept/:id",protectAdminRoute,acceptReview)
router.patch("/reject/:id",protectAdminRoute,rejectReview)

export default router;