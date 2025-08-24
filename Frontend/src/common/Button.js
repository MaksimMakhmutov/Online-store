import styled from "styled-components";

export const Button = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #1f6feb;
  color: #fff;
  font-weight: 600;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
