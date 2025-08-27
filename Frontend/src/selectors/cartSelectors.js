export const selectCart = (state) => state.cart.cart;
export const selectCartItems = (state) => state.cart.cart?.items || [];
export const selectCartTotal = (state) =>
  state.cart.cart?.items?.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  ) || 0;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
