import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const PageMarkButtonWrapper = styled.li<{
  active?: boolean;
  isOptionButton?: boolean;
}>`
  ${BOX_SHADOW.DEFAULT};
  width: 100%;
  font-weight: 900;
  background-color: ${PALETTE.WHITE};
  transition: all 0.3s ease;

  ${({ active }) => {
    return (
      active &&
      css`
        background-color: ${PALETTE.VIOLET};
        color: ${PALETTE.WHITE};
      `
    );
  }};

  ${({ isOptionButton }) => {
    return (
      isOptionButton &&
      css`
        background-color: ${PALETTE.GRAY_500};
        color: ${PALETTE.WHITE};
        font-size: 1.2rem;
      `
    );
  }};
`;

export const PageMarkButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  text-align: center;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
`;
