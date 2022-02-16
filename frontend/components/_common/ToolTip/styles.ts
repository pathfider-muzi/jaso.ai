import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  color: ${PALETTE.GRAY_500};
  border-radius: 50%;
  border: 1px solid ${PALETTE.GRAY_500};
`;

export const Button = styled.button`
  padding: 0.3rem 0.5rem;
`;

export const SpeechBubble = styled.div<{
  textBubbleStyle: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
}>`
  ${({ textBubbleStyle }) => textBubbleStyle};
  color: ${PALETTE.BLACK_900};
  position: absolute;
  ${BORDER.GRAY_150};
  ${BOX_SHADOW.DEFAULT};
  background-color: ${PALETTE.WHITE};
  padding: 1rem;
  border-radius: 10px;
  width: max-content;
  max-width: 30rem;
  white-space: pre-wrap;
  z-index: 1;
`;
