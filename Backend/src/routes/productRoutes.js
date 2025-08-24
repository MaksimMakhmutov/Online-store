import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middlewares/auth.js";

const r = Router();
r.get("/", listProducts);
r.get("/:id", getProduct);
r.post("/", protect, adminOnly, createProduct);
r.put("/:id", protect, adminOnly, updateProduct);
r.delete("/:id", protect, adminOnly, deleteProduct);
export default r;
