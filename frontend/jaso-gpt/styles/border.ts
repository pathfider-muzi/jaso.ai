import { css } from "@emotion/react";
import PALETTE from "../constants/palette";

const BORDER = {
  GRAY_200: css`
    border: 1px solid ${PALETTE.GRAY_200};
  `,
  GRAY_300: css`
    border: 1px solid ${PALETTE.GRAY_300};
  `,
} as const;

export default BORDER;
