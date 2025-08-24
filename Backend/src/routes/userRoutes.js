import { Router } from "express";
import { protect, adminOnly } from "../middlewares/auth.js";
import {
  listUsers,
  setRole,
  deleteUser,
} from "../controllers/userController.js";

const r = Router();
r.get("/", protect, adminOnly, listUsers);
r.put("/:id/role", protect, adminOnly, setRole);
r.delete("/:id", protect, adminOnly, deleteUser);
export default r;
