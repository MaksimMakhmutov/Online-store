import { Category } from "../models/Category.js";
import slugify from "slugify";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort("name");
  res.json({ categories });
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  const slug = slugify(name, { lower: true, strict: true });
  if (await Category.findOne({ slug }))
    return res.status(409).json({ message: "Category exists" });
  const category = await Category.create({ name, slug });
  res.status(201).json({ category });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );
  if (!category) return res.status(404).json({ message: "Not found" });
  res.json({ category });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
