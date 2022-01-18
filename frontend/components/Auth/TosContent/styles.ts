import PALETTE from "@/constants/palette";
import BORDER from "@/constants/styles/border";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
