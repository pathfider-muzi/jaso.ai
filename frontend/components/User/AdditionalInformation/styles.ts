import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${verticalStyle};
  align-items: flex-start;
`;

export const Label = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-bottom: 0.6rem;
`;
