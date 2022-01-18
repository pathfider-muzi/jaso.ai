import PALETTE from "@/constants/styles/palette";
import TAB from "@/constants/tabSideBarStyle";
import styled from "@emotion/styled";

export const Frame = styled.button`
  width: 100%;
  height: ${TAB.HEIGHT_PX}px;
  border: 1px solid ${PALETTE.GRAY_500};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: purple;
  color: ${PALETTE.GRAY_200};
  font-size: 17px;

  &:hover {
    cursor: grab;

    cursor: -webkit-grab;
  }

  &:focus {
    color: white;
    background-color: purple;
    border-bottom: 3px solid white;
  }
`;
