import BUTTON_THEME from "@/constants/styles/buttonTheme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Size } from ".";

const SIZE_INFO: {
  [key in Size]: ReturnType<typeof css>;
} = {
  sm: css`
    font-size: 12px;
    padding: 10px 16px;
  `,
  md: css`
    font-size: 14px;
    padding: 11px 20px;
  `,
  lg: css`
    font-size: 16px;
    padding: 12px 24px;
  `
} as const;

export const Frame = styled.button<{
  size: Size;
}>`
  ${({ size }) => {
    return SIZE_INFO[size];
  }}

  ${BUTTON_THEME.SIMPLE}
`;
