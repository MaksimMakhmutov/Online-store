import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../actions";

export const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    setUser(false);
    navigate("/");
  };

  return (
    <Bar>
      <Brand to="/">Shop</Brand>
      <nav>
        <A to="/">Home</A>
        {user && <A to="/cart">Cart</A>}
        {user?.role === "admin" && <A to="/admin">Admin</A>}
      </nav>
      <div>
        {user ? (
          <UserWrap>
            <span>{user.email}</span>
            <button onClick={onLogout}>Logout</button>
          </UserWrap>
        ) : (
          <>
            <A to="/login">Login</A>
            <A to="/register">Register</A>
          </>
        )}
      </div>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #0d1117;
  color: #fff;
`;
const Brand = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  font-size: 20px;
`;
const A = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 12px;
`;
const UserWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  button {
    padding: 6px 10px;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;
