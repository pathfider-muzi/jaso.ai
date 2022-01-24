import VerticalStyle from "@/components/_common/VerticalStyle";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled(VerticalStyle)<{ width: number }>`
  /* border: 1px solid ${PALETTE.GRAY_150};
  overflow-y: scroll;
  height: 700px;
  margin-left: 40px; */
  & {
    margin-left: 40px;
    margin-bottom: 8px;
  }
`;
