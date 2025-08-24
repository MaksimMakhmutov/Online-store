import { Product } from "../models/Product.js";
import { buildPagination } from "../utils/paginate.js";

export const listProducts = async (req, res) => {
  const {
    q = "",
    category,
    sort = "price",
    order = "asc",
    page = 1,
    limit = 6,
  } = req.query;
  const { skip } = buildPagination(page, limit);
  const filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;

  const sortObj = {};
  if (sort === "price") sortObj.price = order === "desc" ? -1 : 1;
  if (sort === "name") sortObj.name = order === "desc" ? -1 : 1;

  const [items, count] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);
  const totalPages = Math.max(1, Math.ceil(count / Number(limit)));
  res.json({ products: items, totalPages, currentPage: Number(page) });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ product });
};

export const createProduct = async (req, res) => {
  const { name, price, image, description, categoryId } = req.body;
  if (!name || !price || !categoryId)
    return res.status(400).json({ message: "Missing fields" });
  const product = await Product.create({
    name,
    price,
    image,
    description,
    category: categoryId,
  });
  res.status(201).json({ product: await product.populate("category") });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description, categoryId } = req.body;
  const update = { name, price, image, description };
  if (categoryId) update.category = categoryId;
  const product = await Product.findByIdAndUpdate(id, update, {
    new: true,
  }).populate("category");
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ product });
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
