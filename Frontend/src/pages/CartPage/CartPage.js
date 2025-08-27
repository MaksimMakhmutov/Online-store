import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateItem, removeItem, clearAll } from '../../modules/cart/cartSlice';
import { selectCart, selectCartLoading, selectCartError, selectCartTotal } from '../../selectors/cartSelectors';
import { Button, Loader } from '../../common';
import { CartList } from './components';

export const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <CartList
        items={cart.items}
        onQuantityChange={(id, qty) => dispatch(updateItem({ id, qty }))}
        onRemove={(id) => dispatch(removeItem(id))}
      />
      <h3>Total: ${total.toFixed(2)}</h3>
      <Button onClick={() => dispatch(clearAll())}>Clear cart</Button>
    </div>
  );
};
