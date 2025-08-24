import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  updateItem,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

const r = Router();
r.get("/", protect, getCart);
r.post("/", protect, addToCart);
r.put("/:id", protect, updateItem);
r.delete("/:id", protect, removeItem);
r.post("/clear", protect, clearCart);
export default r;
