import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../modules/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
