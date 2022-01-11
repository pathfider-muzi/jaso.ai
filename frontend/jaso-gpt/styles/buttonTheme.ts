import { css } from "@emotion/react";
import BORDER from "./border";
import { BOX_SHADOW } from "./boxShadow";

const BUTTON_THEME = {
  SIMPLE: css`
    ${BORDER.GRAY};
    ${BOX_SHADOW.DEFAULT}
    background-color: transparent;
    border-radius: 10px;
    transition: box-shadow 0.15s ease;

    &:hover {
      ${BOX_SHADOW.BOLD.styles}
    }
  `,
} as const;

export default BUTTON_THEME;
