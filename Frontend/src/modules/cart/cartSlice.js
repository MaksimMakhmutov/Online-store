import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../actions";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await getCart();
  return res.cart;
});

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, qty }) => {
    await updateCartItem(id, qty);
    const res = await getCart();
    return res.cart;
  }
);

export const removeItem = createAsyncThunk("cart/removeItem", async (id) => {
  await removeFromCart(id);
  const res = await getCart();
  return res.cart;
});

export const clearAll = createAsyncThunk("cart/clearAll", async () => {
  await clearCart();
  const res = await getCart();
  return res.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load cart";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearAll.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
