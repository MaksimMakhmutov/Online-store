import { request } from "../utils";

export const getProducts = (params) =>
  request("/products", "GET", null, params);

export const getProductById = (id) => request(`/products/${id}`);

export const createProduct = (data) => request("/products", "POST", data);

export const updateProduct = (id, data) =>
  request(`/products/${id}`, "PUT", data);

export const deleteProduct = (id) => request(`/products/${id}`, "DELETE");
