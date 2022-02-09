import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const AdditionalInfo = styled.div`
  width: 100%;
  height: 4rem;
  ${BORDER.GRAY_150};
  border-radius: 10px;
  padding: 1rem;
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  transition: all 0.1s linear;
  border-radius: 10px;
  ${BORDER.GRAY_150};

  &:hover {
    background-color: ${PALETTE.GRAY_150};
  }
`;
