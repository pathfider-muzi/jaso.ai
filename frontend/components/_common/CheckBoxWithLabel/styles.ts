import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  display: flex;
  color: ${PALETTE.GRAY_400};
  font-size: 1rem;
`;
