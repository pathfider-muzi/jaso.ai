import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  height: 46rem;
  ${BORDER.GRAY_150};
  ${BOX_SHADOW.DEFAULT}
  color: ${PALETTE.BLACK_900};
  border-radius: 10px;
`;

export const Nav = styled.nav`
  width: 100%;

  & > button:not(:last-child) {
    border-right: 1px solid ${PALETTE.GRAY_300};
  }
`;

export const NavButton = styled.button<{
  isSelected?: boolean;
}>`
  padding: 1rem;
  ${({ isSelected }) => {
    return css`
      border-bottom: ${isSelected ? "none" : `1px solid ${PALETTE.GRAY_300}`};
    `;
  }}
`;

export const SideBarContentWrapper = styled.div``;
