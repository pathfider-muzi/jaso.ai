import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.textarea<{
  height: number;
}>`
  ${({ height }) => {
    return {
      height: height
    };
  }}
  width: 100%;
  resize: none;
  white-space: nowrap;
  overflow-x: scroll;
  margin: 0;
  padding: 10px;
  margin-top: -5px;
  border: 1px solid ${PALETTE.GRAY_200};
`;
