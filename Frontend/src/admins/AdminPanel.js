import styled from "styled-components";
import { getProducts, deleteProduct, getCategories } from "../actions";
import { getCurrentUser } from "../actions";
import {
  ProductTable,
  CategoryForm,
  ProductForm,
  UserTable,
} from "./components";
import { Loader } from "../common";
import { request } from "../utils";
import { useEffect, useState } from "react";

export const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadAll = async () => {
    setLoading(true);
    const prods = await getProducts({ page: 1, limit: 100 });
    const cats = await getCategories();
    const usr = await request("/users", "GET");
    setProducts(prods.products || []);
    setCategories(cats.categories || []);
    setUsers(usr.users || []);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUser()
      .then((r) => setUser(r.user))
      .catch(() => setUser(null));
    loadAll();
  }, []);

  const onDeleteProduct = async (id) => {
    await deleteProduct(id);
    loadAll();
  };

  if (loading) return <Loader />;
  if (!user || user.role !== "admin") return <div>Access denied</div>;

  return (
    <Wrap>
      <ProductForm
        onSaved={loadAll}
        initial={editing}
        onDone={() => setEditing(null)}
      />
      <ProductTable
        products={products}
        onEdit={(p) => setEditing(p)}
        onDelete={onDeleteProduct}
      />
      <CategoryForm categories={categories} onChanged={loadAll} />
      <UserTable users={users} onChanged={loadAll} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  gap: 24px;
  padding: 16px;
`;
