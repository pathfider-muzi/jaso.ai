import SpellingCorrectResultComponent from "@/components/Editor/SpellingCorrectResult";
import ButtonComponent from "@/components/_common/Button";
import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  height: 46rem;
  ${BORDER.GRAY_150};
  ${BOX_SHADOW.DEFAULT}
  color: ${PALETTE.BLACK_900};
  border-radius: 10px;
  width: 22rem;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  max-height: 3rem;

  & > button:not(:last-child) {
    border-right: 1px solid ${PALETTE.GRAY_300};
  }
`;

export const NavButton = styled.button<{
  isSelected?: boolean;
}>`
  flex: 1;
  transition: all 0.1s linear;
  border-bottom: 1px solid ${PALETTE.GRAY_300};
  padding: 1rem;

  ${({ isSelected }) => {
    return (
      isSelected &&
      css`
        border-bottom: none;
        font-weight: 900;
      `
    );
  }}
`;

export const SideBarContentWrapper = styled.div`
  padding: 1rem;
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  background-color: ${PALETTE.WHITE};
`;

export const TabWrapper = styled.div`
  ${verticalStyle};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const SpellingCheckButton = styled(ButtonComponent)`
  width: 100%;
  background-color: ${PALETTE.BLUE};
  border: none;
  color: ${PALETTE.WHITE};
`;

export const SpellingCorrectResult = styled(SpellingCorrectResultComponent)`
  margin-top: 1rem;
  overflow-y: scroll;
`;
