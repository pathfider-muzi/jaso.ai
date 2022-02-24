import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const ButtonsFrame = styled.div`
  display: flex;
  width: 100%;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  height: 3rem;
  flex: 1;
  border: 1px solid ${PALETTE.GRAY_300};

  transition: all 0.2s linear;
  &:hover {
    color: ${PALETTE.WHITE};
    background-color: ${PALETTE.BLUE};
    font-weight: 900;
  }
`;
