import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => (
  <Card to={`/products/${product._id}`}>
    <img src={product.image} alt={product.name} />
    <h4>{product.name}</h4>
    <p>${product.price}</p>
    <small>{product?.category?.name}</small>
  </Card>
);

const Card = styled(Link)`
  display: block;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  h4 {
    margin: 4px 0;
  }
`;
