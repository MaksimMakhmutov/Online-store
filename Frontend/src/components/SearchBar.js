import styled from "styled-components";
import { Input, Button } from "../common";

export const SearchBar = ({
  q,
  setQ,
  category,
  setCategory,
  categories,
  sort,
  setSort,
  order,
  setOrder,
  onSubmit,
}) => (
  <Form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <Input
      placeholder="Search by name"
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />

    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">All categories</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </Select>

    <Select
      value={`${sort}_${order}`}
      onChange={(e) => {
        const [s, o] = e.target.value.split("_");
        setSort(s);
        setOrder(o);
      }}
    >
      <option value="price_asc">Price: Low → High</option>
      <option value="price_desc">Price: High → Low</option>
      <option value="name_asc">Name: A → Z / А → Я</option>
      <option value="name_desc">Name: Z → A / Я → А</option>
    </Select>

    <Button type="submit">Search</Button>
  </Form>
);

const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 12px 0;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
