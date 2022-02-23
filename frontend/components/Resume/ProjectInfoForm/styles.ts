import ButtonComponent from "@/components/_common/Button";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const TextInput = styled.input`
  line-height: 1.3rem;
  font-size: 1rem;
  color: ${PALETTE.BLACK_700};
  font-weight: 500;
  border: none;
  outline: none;
  width: 100%;
`;

export const TextContent = styled(TextInput)`
  word-break: break-all;
  white-space: break-spaces;
`.withComponent("span");

export const TextArea = styled.textarea`
  line-height: 1.3rem;
  font-size: 1rem;
  color: ${PALETTE.BLACK_700};
  font-weight: 500;
  border: none;
  outline: none;
  width: 100%;
  resize: none;
`;

export const LoadingImageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  margin: 1rem 2rem;
  margin-left: 0;

  & > span {
    margin-left: 1rem;
  }
`;

export const ProjectTerm = styled.div`
  line-height: 1.4rem;
`;

export const YearInput = styled.input`
  width: 3rem;
  padding: 0.2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
`;
export const MonthInput = styled(YearInput)`
  width: 2.2rem;
`;

export const HyphenBetweenDate = styled.span`
  margin-right: 1rem;
`;

export const IntroductionContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const IntroductionGenerateButton = styled(ButtonComponent)`
  margin-bottom: 1rem;
  max-width: fit-content;
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  border: none;
  font-weight: 900;
`;

export const Line = styled.div`
  width: 100%;
  ${BORDER.GRAY_300};
  height: 0;
  margin-bottom: 1rem;
`;
