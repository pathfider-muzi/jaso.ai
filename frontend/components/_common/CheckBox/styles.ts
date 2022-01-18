import PALETTE from "@/constants/palette";
import BORDER from "@/constants/styles/border";
import styled from "@emotion/styled";

export const Frame = styled.input`
  width: 1rem;
  min-width: 1rem;
  max-width: 1rem;
  height: 1rem;
  margin-right: 0.375rem;
  appearance: none;
  background-color: transparent;
  border-radius: 0.25rem;
  outline: none;
  vertical-align: middle;
  ${BORDER.GRAY_300}

  &:checked {
    border-color: ${PALETTE.BLACK_900};
    background: ${PALETTE.BLACK_900} url("/check_icon.png") no-repeat center center;
    background-size: 0.625rem 0.5rem;
  }

  &:focus {
    border-color: ${PALETTE.BLUE};
  }
`;
