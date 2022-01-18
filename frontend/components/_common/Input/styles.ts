import PALETTE from "@/constants/palette";
import BORDER from "@/constants/styles/border";
import styled from "@emotion/styled";

export const Frame = styled.input`
  transition-delay: initial;
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  display: block;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  background-color: ${PALETTE.GRAY_100};
  border-radius: 0.25rem;
  color: ${PALETTE.BLACK_900};
  font-size: 1rem;
  line-height: 1.5rem;
  outline: 0;
  width: 100%;
  ${BORDER.GRAY_150}

  &:hover, &:focus {
    border-color: ${PALETTE.BLUE};
  }
`;
