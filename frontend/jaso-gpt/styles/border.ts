import { css } from "@emotion/react";
import PALETTE from "../constants/palette";

const BORDER = {
  GRAY: css`
    border: 1px solid ${PALETTE.GRAY_200};
  `,
} as const;

export default BORDER;
