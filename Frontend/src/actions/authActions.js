import { request } from "../utils";

export const login = (data) => request("/auth/login", "POST", data);

export const register = (data) => request("/auth/register", "POST", data);

export const logout = () => request("/auth/logout", "POST");

export const getCurrentUser = () => request("/auth/me");
