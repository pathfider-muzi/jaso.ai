import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
`;

export const ContentModal = styled.div`
  ${BORDER.GRAY_300}
  border-radius: 10px;
  padding: 1rem;
  position: absolute;
  ${BOX_SHADOW.DEFAULT}
`;

export const Alarm = styled.div<{
  isViewed: boolean;
}>`
  min-width: 6rem;
  padding: 1rem;
  background-color: ${({ isViewed }) => (isViewed ? PALETTE.GRAY_300 : PALETTE.WHITE)};
`;

export const AlarmTitle = styled.div`
  width: 100%;
`;

export const AlarmContent = styled.div`
  width: 100%;
`;
