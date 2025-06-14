import { Business } from "../models/Business.model.js";
import { Review } from "../models/Review.model.js";

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};




export const getBusinessReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ business: id, status: "approved" })
      .populate("user", "username email") 
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res.status(404).json({
        success: false,
        message: "No approved reviews found for this business",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching business reviews:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch business reviews",
      error: error.message,
    });
  }
};