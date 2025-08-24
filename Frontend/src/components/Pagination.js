import styled from "styled-components";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <Wrap>
      {pages.map((p) => (
        <Btn
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </Btn>
      ))}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
`;
const Btn = styled.button`
  padding: 6px 10px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  &[aria-current="page"] {
    background: #1f6feb;
    color: #fff;
    border-color: #1f6feb;
  }
`;
