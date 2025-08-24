import styled from "styled-components";
import { CartItem } from "./CartItem";

export const CartList = ({ items, onQuantityChange, onRemove }) => (
  <List>
    {items.map((it) => (
      <CartItem
        key={it.product._id}
        item={it}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />
    ))}
  </List>
);

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    display: grid;
    grid-template-columns: 60px 1fr 100px 100px;
    gap: 10px;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 8px;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
`;
