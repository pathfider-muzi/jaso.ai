import styled from "@emotion/styled";

export const Frame = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;

  &:hover:enabled {
    filter: brightness(90%);
    transition: all 0.3s ease;
  }
`;
