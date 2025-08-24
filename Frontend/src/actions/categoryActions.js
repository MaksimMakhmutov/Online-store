import { request } from "../utils";

export const getCategories = () => request("/categories");

export const createCategory = (data) => request("/categories", "POST", data);

export const updateCategory = (id, data) =>
  request(`/categories/${id}`, "PUT", data);

export const deleteCategory = (id) => request(`/categories/${id}`, "DELETE");