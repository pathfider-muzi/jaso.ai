import PALETTE from "@/constants/styles/palette";
import { css } from "@emotion/react";

const SERVICE_KEYWORD_THEME = [
  css`
    background-image: linear-gradient(90deg, ${PALETTE.BLUE}, ${PALETTE.MINT});

    @keyframes first-flick {
      0% {
        opacity: 0.3;
      }
      12% {
        opacity: 1;
      }
      24% {
        opacity: 1;
      }
      36% {
        opacity: 0.3;
      }
      48% {
        opacity: 0.3;
      }
      60% {
        opacity: 0.3;
      }
      72% {
        opacity: 0.3;
      }
      84% {
        opacity: 0.3;
      }
      96% {
        opacity: 0.3;
      }
    }
  `,
  css`
    background-image: linear-gradient(90deg, ${PALETTE.VIOLET}, ${PALETTE.HOT_PINK});

    @keyframes second-flick {
      0% {
        opacity: 0.3;
      }
      12% {
        opacity: 0.3;
      }
      24% {
        opacity: 0.3;
      }
      36% {
        opacity: 1;
      }
      48% {
        opacity: 1;
      }
      60% {
        opacity: 0.3;
      }
      72% {
        opacity: 0.3;
      }
      84% {
        opacity: 0.3;
      }
      96% {
        opacity: 0.3;
      }
    }
  `,
  css`
    background-image: linear-gradient(90deg, ${PALETTE.PINK}, ${PALETTE.YELLOW});

    @keyframes third-flick {
      0% {
        opacity: 0.3;
      }
      12% {
        opacity: 0.3;
      }
      24% {
        opacity: 0.3;
      }
      36% {
        opacity: 0.3;
      }
      48% {
        opacity: 0.3;
      }
      60% {
        opacity: 1;
      }
      72% {
        opacity: 1;
      }
      84% {
        opacity: 0.3;
      }
      96% {
        opacity: 0.3;
      }
    }
  `
] as const;

export default SERVICE_KEYWORD_THEME;
