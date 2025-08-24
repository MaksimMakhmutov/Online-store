import styled, { keyframes } from "styled-components";

const spin = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`;

export const Loader = () => (
  <Wrap>
    <Circle />
  </Wrap>
);

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
const Circle = styled.div`
  width: 36px;
  height: 36px;
  border: 4px solid #ddd;
  border-top-color: #1f6feb;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
