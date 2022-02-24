import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const ButtonsFrame = styled.div`
  display: flex;
  & > button:not(:last-child) {
    margin-left: 120px;
    margin-right: 8px;
  }
`;

export const Button = styled.button`
  width: 100px;
  height: 20px;
  border: 1px solid ${PALETTE.GRAY_300};
  border-radius: 10%;
`;
