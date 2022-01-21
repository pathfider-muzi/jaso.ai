import PALETTE from "@/constants/styles/palette";
import TAB from "@/constants/styles/tabSideBarStyle";
import styled from "@emotion/styled";

export const Frame = styled.button<{
  isClicked: boolean;
}>`
  ${({ isClicked }) => {
    if (isClicked) {
      return {
        color: PALETTE.WHITE
      };
    } else {
      return {
        color: PALETTE.GRAY_200
      };
    }
  }}

  width: 100%;
  height: ${TAB.HEIGHT_PX}px;
  border: 1px solid ${PALETTE.GRAY_500};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: purple;
  font-size: 17px;

  &:hover {
    cursor: grab;

    cursor: -webkit-grab;
  }
`;
