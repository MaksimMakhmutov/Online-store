import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../actions";
import { Button, Loader } from "../../common";
import { useEffect, useState } from "react";
import { CartList } from "./components";

export const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCart(res.cart);
      setError("");
    } catch {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleQuantityChange = async (id, qty) => {
    await updateCartItem(id, qty);
    load();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    load();
  };

  const handleClear = async () => {
    if (clearing) return;
    setClearing(true);
    await clearCart();
    await load();
    setClearing(false);
  };

  const total =
    cart?.items?.reduce((s, i) => s + i.product.price * i.quantity, 0) || 0;

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <CartList
        items={cart.items}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
      />
      <h3>Total: ${total.toFixed(2)}</h3>
      <Button onClick={handleClear} disabled={clearing}>
        {clearing ? "Clearing..." : "Clear cart"}
      </Button>
    </div>
  );
};
