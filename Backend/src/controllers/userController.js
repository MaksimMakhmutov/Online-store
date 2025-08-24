import { User } from "../models/User.js";

export const listUsers = async (req, res) => {
  const users = await User.find().select("-password").sort("-createdAt");
  res.json({ users });
};

export const setRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!["user", "admin"].includes(role))
    return res.status(400).json({ message: "Invalid role" });
  const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json({ user });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
