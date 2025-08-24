import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./components";
import { Home, CartPage, NotFound, ProductDetail } from "./pages";
import { Login, Register } from "./auth";
import { getCurrentUser } from "./actions";
import { AdminPanel } from "./admins";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.user))
      .catch(() => setUser(false));
  }, []);

  const RequireAuth = ({ children }) => {
    const loc = useLocation();
    if (user === null) return null;
    if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
    return children;
  };

  const AdminOnly = ({ children }) => {
    if (user === null) return null;
    if (!user || user.role !== "admin") return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminOnly>
              <AdminPanel />
            </AdminOnly>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
