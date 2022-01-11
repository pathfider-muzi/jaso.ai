import styled from "@emotion/styled";
import PALETTE from "@/constants/palette";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Label = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-bottom: 0.6rem;
`;
