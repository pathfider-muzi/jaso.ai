import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputData = styled.div`
  ${BORDER.GRAY_300}
  ${BOX_SHADOW.DEFAULT}
  border-radius: 10px;
  padding: 1rem;
  min-width: 40rem;
  min-height: 17rem;
`;

export const DownArrowImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export const OutputData = styled(InputData)``;
