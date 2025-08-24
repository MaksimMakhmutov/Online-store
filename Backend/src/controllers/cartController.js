import { Cart } from "../models/Cart.js";

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    populate: "category",
  });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate({ path: "items.product", populate: "category" });
  }
  return cart;
};

export const getCart = async (req, res) => {
  const cart = await ensureCart(req.user._id);
  res.json({ cart });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await ensureCart(req.user._id);
  const idx = cart.items.findIndex(
    (i) => i.product._id.toString() === productId
  );
  if (idx > -1) cart.items[idx].quantity += Number(quantity);
  else cart.items.push({ product: productId, quantity: Number(quantity) });
  await cart.save();
  cart = await ensureCart(req.user._id);
  res.status(201).json({ cart });
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  let { quantity } = req.body;

  // проверка
  quantity = Number(quantity);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Quantity must be a positive integer" });
  }

  let cart = await ensureCart(req.user._id);

  cart.items = cart.items.map((i) =>
    i.product._id.toString() === id ? { ...i.toObject(), quantity } : i
  );

  await cart.save();
  cart = await ensureCart(req.user._id);
  res.json({ cart });
};

export const removeItem = async (req, res) => {
  const { id } = req.params;
  let cart = await ensureCart(req.user._id);
  cart.items = cart.items.filter((i) => i.product._id.toString() !== id);
  await cart.save();
  cart = await ensureCart(req.user._id);
  res.json({ cart });
};

export const clearCart = async (req, res) => {
  let cart = await ensureCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ cart });
};
