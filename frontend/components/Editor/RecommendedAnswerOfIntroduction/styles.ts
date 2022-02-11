import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.section`
  width: 400px;
  text-align: center;
  box-shadow: ${BOX_SHADOW.BOLD};
  border: 1px solid ${PALETTE.GRAY_200};
  padding: 1rem;
  min-height: 250px;
  max-height: 500px;
  border-radius: 10px;
  overflow-y: scroll;
  margin-right: 1rem;
`;

export const Answer = styled.div`
  margin-bottom: 6px;
`;

export const CopyPaste = styled.image`
  left: 160px;
  padding-top: 5px;
  position: relative;
  bottom: -5px;
`;
