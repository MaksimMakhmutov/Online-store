import { Button } from "../../common";
import { createCategory, deleteCategory, updateCategory } from "../../actions";
import styled from "styled-components";
import { useState } from "react";

export const CategoryForm = ({ categories, onChanged }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const onCreateCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (!name) return;
    await createCategory({ name });
    e.target.reset();
    onChanged && onChanged();
  };

  const onDeleteCategory = async (id) => {
    await deleteCategory(id);
    onChanged && onChanged();
  };

  const onEdit = (c) => {
    setEditingId(c._id);
    setEditName(c.name);
  };

  const onSave = async (id) => {
    if (!editName.trim()) return;
    await updateCategory(id, { name: editName.trim() });
    setEditingId(null);
    setEditName("");
    onChanged && onChanged();
  };

  const onCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <section>
      <h3>Categories</h3>

      <Form onSubmit={onCreateCategory}>
        <input name="name" placeholder="Category name" />
        <Button type="submit">Add</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>
                {editingId === c._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editingId === c._id ? (
                  <>
                    <Button onClick={() => onSave(c._id)}>Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => onEdit(c)}>Edit</Button>
                    <Button onClick={() => onDeleteCategory(c._id)}>
                      Delete
                    </Button>
                  </>
                )}
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
  td > button {
    margin-right: 8px;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
