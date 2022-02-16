import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0.3rem;
  transition: all 0.1s linear;
  border-radius: 10px;
  padding: 0.5rem;

  &:hover {
    background-color: ${PALETTE.GRAY_200};
  }
`;
