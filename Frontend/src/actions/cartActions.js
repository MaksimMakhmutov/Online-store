import { request } from "../utils";

export const getCart = () => request("/cart");

export const addToCart = (productId, quantity = 1) =>
  request("/cart", "POST", { productId, quantity });

export const updateCartItem = (productId, quantity) =>
  request(`/cart/${productId}`, "PUT", { quantity });

export const removeFromCart = (productId) =>
  request(`/cart/${productId}`, "DELETE");

export const clearCart = () => request("/cart/clear", "POST");
