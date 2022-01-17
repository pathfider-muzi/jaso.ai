import PALETTE from "@/constants/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  display: flex;
  margin: 1.5rem 0;
  color: ${PALETTE.GRAY_400};
  font-size: 1rem;
`;
