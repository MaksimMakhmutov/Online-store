import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById, addToCart, getCurrentUser } from "../../actions";
import { Loader, Button } from "../../common";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false); // 👈 состояние блокировки

  useEffect(() => {
    getCurrentUser()
      .then((r) => setUser(r.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.product);
        setError("");
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const add = async () => {
    if (!user) {
      alert("Login to add items");
      return;
    }
    try {
      setAdding(true); // 👈 блокируем кнопку
      await addToCart(product._id, 1);
      alert("Added to cart");
    } catch {
      alert("Failed to add item");
    } finally {
      setAdding(false); // 👈 разблокируем кнопку
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error>{error}</Error>;

  return (
    <Wrap>
      <ImageWrap>
        <img src={product.image} alt={product.name} />
      </ImageWrap>
      <Info>
        <h2>{product.name}</h2>
        <Description>{product.description}</Description>
        <Price>${product.price}</Price>
        <Category>Category: {product.category?.name}</Category>
        <ButtonStyled onClick={add} disabled={adding}>
          {adding ? "Adding..." : "Add to cart"}
        </ButtonStyled>
      </Info>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
  padding: 32px;
  align-items: start;
`;

const ImageWrap = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    margin: 0;
    font-size: 28px;
    color: #222;
  }
`;

const Description = styled.p`
  color: #555;
  line-height: 1.5;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #24973dff;
`;

const Category = styled.div`
  font-size: 14px;
  color: #888;
`;

const ButtonStyled = styled(Button)`
  width: fit-content;
  padding: 10px 20px;
  font-size: 16px;
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  padding: 20px;
`;
