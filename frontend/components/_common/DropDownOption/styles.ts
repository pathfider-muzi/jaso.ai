import BUTTON_THEME from "@/constants/styles/buttonTheme";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${BUTTON_THEME.SIMPLE};
  min-width: 7rem;
  height: fit-content;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${PALETTE.WHITE};
`;

export const Text = styled.button`
  width: 100%;
  padding: 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    color: ${PALETTE.BLUE};
  }
`;
