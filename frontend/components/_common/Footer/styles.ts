import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid ${PALETTE.GRAY_150};
  justify-content: center;
  align-items: center;
`;
