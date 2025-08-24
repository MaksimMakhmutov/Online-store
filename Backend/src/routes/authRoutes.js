import { Router } from "express";
import { body } from "express-validator";
import { register, login, me, logout } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const r = Router();
r.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  register
);
r.post("/login", login);
r.get("/me", protect, me);
r.post("/logout", protect, logout);
export default r;
