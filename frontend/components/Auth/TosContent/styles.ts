import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${verticalStyle};
  align-items: flex-start;
`;

export const Label = styled.span`
  color: ${PALETTE.BLACK_900};
  font-weight: bold;
  margin-bottom: 0.6rem;
`;

export const Content = styled.div`
  height: fit-content;
  max-height: 43rem;
  overflow-y: scroll;
  padding: 0.5rem 1rem;
  background-color: ${PALETTE.GRAY_100};
  border-radius: 0.25rem;
  color: ${PALETTE.BLACK_900};
  font-size: 1rem;
  line-height: 1.5rem;
  outline: 0;
  width: 100%;
  word-break: break-all;
  white-space: break-spaces;
  ${BORDER.GRAY_300}
`;
