import styled from "@emotion/styled";

export const ButtonsFrame = styled.div`
  & > button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Button = styled.button`
  width: 100px;
  height: 20px;
  border-radius: 5px;
`;
