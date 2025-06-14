import mongoose from "mongoose";
import dotenv from "dotenv";
import { Business } from "../models/Business.model.js"; // adjust the path if needed

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const businesses = [
  {
    name: "Tandoori Treats",
    category: "restaurant",
    location: { city: "Delhi", address: "123 Karol Bagh" },
  },
  {
    name: "Chai Pe Charcha",
    category: "cafe",
    location: { city: "Mumbai", address: "Bandra West, Lane 2" },
  },
  {
    name: "The Groom Room",
    category: "salon",
    location: { city: "Hyderabad", address: "Secunderabad Market" },
  },
  {
    name: "Veggie Delight",
    category: "restaurant",
    location: { city: "Bangalore", address: "Whitefield 5th Cross" },
  },
  {
    name: "Java Jolt",
    category: "cafe",
    location: { city: "Delhi", address: "Connaught Place, Block B" },
  },
  {
    name: "QuickCuts Salon",
    category: "salon",
    location: { city: "Mumbai", address: "Andheri East, Shop 21" },
  },
  {
    name: "Fashion Hub",
    category: "shop",
    location: { city: "Bangalore", address: "Brigade Road 6" },
  },
  {
    name: "Cafe Bliss",
    category: "cafe",
    location: { city: "Hyderabad", address: "Banjara Hills, Street 8" },
  },
  {
    name: "Roll Nation",
    category: "restaurant",
    location: { city: "Delhi", address: "Saket Mall, Food Court" },
  },
  {
    name: "GlowUp Salon",
    category: "salon",
    location: { city: "Mumbai", address: "Colaba Causeway" },
  },
  {
    name: "Techie Store",
    category: "shop",
    location: { city: "Bangalore", address: "MG Road, Complex 1" },
  },
  {
    name: "Masala Bistro",
    category: "restaurant",
    location: { city: "Hyderabad", address: "Gachibowli Circle" },
  },
  {
    name: "Daily Brew",
    category: "cafe",
    location: { city: "Delhi", address: "Lajpat Nagar 4" },
  },
  {
    name: "Royal Looks",
    category: "salon",
    location: { city: "Mumbai", address: "Powai Plaza" },
  },
  {
    name: "Spice Avenue",
    category: "restaurant",
    location: { city: "Bangalore", address: "HSR Layout 3" },
  },
  {
    name: "Sassy Scissors",
    category: "salon",
    location: { city: "Hyderabad", address: "Madhapur Lane 7" },
  },
  {
    name: "Bookish Den",
    category: "shop",
    location: { city: "Delhi", address: "Rajouri Garden, Shop 44" },
  },
  {
    name: "Brew Beans",
    category: "cafe",
    location: { city: "Mumbai", address: "Churchgate Street 3" },
  },
  {
    name: "Taste of Punjab",
    category: "restaurant",
    location: { city: "Bangalore", address: "Jayanagar 2nd Block" },
  },
  {
    name: "Urban Threads",
    category: "shop",
    location: { city: "Hyderabad", address: "Kukatpally Main Road" },
  },
];

const seedBusinesses = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Business.insertMany(businesses);
    console.log(" 20 businesses inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(" Failed to insert businesses:", error.message);
    process.exit(1);
  }
};

seedBusinesses();
