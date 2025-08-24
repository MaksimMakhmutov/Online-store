import styled from "styled-components";
import { request } from "../../utils";

export const UserTable = ({ users, onChanged }) => {
  const onChangeRole = async (id, role) => {
    await request(`/users/${id}/role`, "PUT", { role });
    onChanged && onChanged();
  };

  return (
    <section>
      <h3>Users</h3>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => onChangeRole(u._id, e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
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
