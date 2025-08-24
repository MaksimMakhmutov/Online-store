import { Button } from "../../../common";
import { useState, useEffect } from "react";

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const [localQty, setLocalQty] = useState(item.quantity);

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);
    await onRemove(item.product._id);
    setLoading(false);
  };

  useEffect(() => {
    if (localQty === 0) {
      const confirmDelete = window.confirm(
        "You have selected 0 items. Are you sure you want to remove this item from your cart?"
      );
      if (confirmDelete) {
        handleRemove();
      } else {
        setLocalQty(item.quantity);
      }
      return;
    }

    const timeout = setTimeout(async () => {
      if (localQty !== item.quantity) {
        if (!Number.isInteger(localQty) || localQty < 1) return;
        setLoading(true);
        await onQuantityChange(item.product._id, localQty);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [localQty]);

  return (
    <li>
      <img src={item.product.image} alt={item.product.name} />
      <div className="info">
        <strong>{item.product.name}</strong>
        <span>${item.product.price}</span>
      </div>
      <input
        type="number"
        min="0"
        value={localQty}
        onChange={(e) => setLocalQty(Number(e.target.value))}
        disabled={loading}
      />
      <Button onClick={handleRemove} disabled={loading}>
        {loading ? "..." : "Remove"}
      </Button>
    </li>
  );
};
