import { Business } from "../models/Business.model.js";

export const getBusinesses = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = city ? { "location.city": city } : {};
    const businesses = await Business.find(filter);
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addBusiness = async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};