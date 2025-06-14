import { Review } from "../models/Review.model.js";
import { Business } from "../models/Business.model.js";
import { User } from "../models/User.model.js";




export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("business", "user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user reviews",
      error: error.message,
    });
  }
};

export const addReviews = async (req, res) => {
    const {id}=req.params
  const { quality, service, value, comment } = req.body;

  if ( !quality || !service || !value || !comment) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (business, quality, service, value, comment) are required",
    });
  }

  try {
    const newReview = await Review.create({
      user: req.user._id,
      business:id,
      quality,
      service,
      value,
      comment,
      photo: req.file ? `/uploads/reviews/${req.file.filename}` : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted and pending approval",
      review: newReview,
    });
  } catch (error) {
    console.error("Error submitting review:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
};


export const getPendingReviews = async (req, res) => {
  try {
    const pendingReviews = await Review.find({ status: "pending" })
      .populate("user", "username email")
      .populate("business", "name category");

    res.status(200).json({
      success: true,
      message: "Pending reviews fetched successfully",
      reviews: pendingReviews,
    });
  } catch (error) {
    console.error("Error fetching pending reviews:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending reviews",
      error: error.message,
    });
  }
};





export const acceptReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Review.findByIdAndUpdate(id, { status: "approved" }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review approved", review: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to approve review", error: error.message });
  }
};



export const rejectReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Review.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review rejected", review: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reject review", error: error.message });
  }
};
