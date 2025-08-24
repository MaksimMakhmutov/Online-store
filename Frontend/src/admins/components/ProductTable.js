import styled from "styled-components";
import { Button } from "../../common";

export const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <section>
      <h3>Products</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category?.name}</td>
              <td>
                <Button
                  onClick={() => onEdit(p)}
                  style={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button onClick={() => onDelete(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #eee;
    padding: 8px;
    text-align: left;
  }
`;
