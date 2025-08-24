import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

const run = async () => {
  await connectDB(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce"
  );
  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({}),
  ]);

  const [admin, user] = await User.create([
    { email: "admin@mail.com", password: "admin123", role: "admin" },
    { email: "user@mail.com", password: "user123", role: "user" },
  ]);

  const [clothes, electronics, accessories] = await Category.create([
    { name: "Clothes", slug: "clothes" },
    { name: "Electronics", slug: "electronics" },
    { name: "Accessories", slug: "accessories" },
  ]);

  await Product.create([
    {
      name: "T-Shirt",
      price: 25,
      image: "https://via.placeholder.com/300x200",
      description: "Cotton Tee",
      category: clothes._id,
    },
    {
      name: "Headphones",
      price: 99,
      image: "https://via.placeholder.com/300x200",
      description: "Noise canceling",
      category: electronics._id,
    },
    {
      name: "Cap",
      price: 15,
      image: "https://via.placeholder.com/300x200",
      description: "Baseball cap",
      category: accessories._id,
    },
    {
      name: "Jeans",
      price: 45,
      image: "https://via.placeholder.com/300x200",
      description: "Blue denim",
      category: clothes._id,
    },
    {
      name: "Smartphone",
      price: 599,
      image: "https://via.placeholder.com/300x200",
      description: "Latest model",
      category: electronics._id,
    },
    {
      name: "Belt",
      price: 20,
      image: "https://via.placeholder.com/300x200",
      description: "Leather belt",
      category: accessories._id,
    },
  ]);

  console.log("Seed complete");
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
