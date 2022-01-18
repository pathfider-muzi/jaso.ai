import PALETTE from "@/constants/palette";
import styled from "@emotion/styled";

const TitleContainer = styled.div`
  width: 100%;
`;

export const WordCountedText = styled.div`
  border: 1px solid;
  width: 100%;
  height: 30px;
  border: 1px solid ${PALETTE.GRAY_200};
  margin-top: 0px;
`;

export default TitleContainer;
