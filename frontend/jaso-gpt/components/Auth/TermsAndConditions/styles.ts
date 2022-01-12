import PALETTE from "@/constants/palette";
import styled from "@emotion/styled";

export const Frame = styled.label`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  display: flex;
  margin: 1.5rem 0 1.4rem 0;
  color: ${PALETTE.GRAY_400};
  font-size: 1rem;
`;
