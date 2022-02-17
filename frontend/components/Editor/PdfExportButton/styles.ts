import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.1s linear;
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${PALETTE.GRAY_200};
  }
`;
