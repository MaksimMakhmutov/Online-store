import styled from "styled-components";
import { getProducts, getCategories } from "../actions";
import { ProductCard } from "./components/ProductCard";
import { Pagination, SearchBar } from "../components";
import { Loader } from "../common";
import { useEffect, useState } from "react";

export const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("asc");

  const load = async (
    p = page,
    search = q,
    cat = category,
    s = sort,
    o = order
  ) => {
    setLoading(true);
    try {
      const res = await getProducts({
        q: search,
        category: cat,
        page: p,
        limit: 6,
        sort: s,
        order: o,
      });
      setProducts(res.products || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.currentPage || p);
      setError("");
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories().then((r) => setCategories(r.categories || []));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      load(1, q, category, sort, order);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [q, category, sort, order]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <SearchBar
        q={q}
        setQ={setQ}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onSubmit={() => load(1, q, category, sort, order)}
      />

      <Grid>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </Grid>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => load(p, q, category, sort, order)}
      />
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`;
