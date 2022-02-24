import ButtonComponent from "@/components/_common/Button";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import { css } from "@emotion/react";
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

export const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;
`;

export const TextContent = styled(TextInput)`
  word-break: break-all;
  white-space: break-spaces;
`.withComponent("span");

export const ResultWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ResultButtonWrapper = styled.div`
  position: absolute;
  top: -3rem;
  right: 0;
  display: flex;
  gap: 0.5rem;
`;

export const CopyButton = styled(ButtonComponent)`
  color: ${PALETTE.WHITE};
  font-weight: 900;
  font-size: 1rem;
  background-color: ${PALETTE.GREEN};
`;

export const GoToEditorButton = styled(ButtonComponent)`
  color: ${PALETTE.WHITE};
  font-weight: 900;
  font-size: 1rem;
  background-color: ${PALETTE.ORANGE};
`;

export const HighLightText = styled.span`
  font-weight: 900;
  color: ${PALETTE.BLUE};
`;

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

export const IntroductionGenerateButton = styled(ButtonComponent)<{
  isFetched: boolean;
}>`
  margin-bottom: 1rem;
  max-width: fit-content;
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  border: none;
  font-weight: 900;
  position: relative;

  &::after {
    ${({ isFetched }) =>
      !isFetched &&
      css`
        display: none;
      `}
    top: 0;
    left: 100%;
    color: ${PALETTE.BLACK_900};
    padding: 0.4rem 0.6rem;
    width: max-content;
    border-radius: 10px;
    position: absolute;
    content: "<< 지원동기가 마음에 들지 않으신가요? 다시 생성해보세요!";
    animation: move 3s linear infinite;

    @keyframes move {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(10px);
      }
      50% {
        transform: translateX(15px);
      }
      75% {
        transform: translateX(10px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  ${BORDER.GRAY_300};
  height: 0;
  margin-bottom: 1rem;
`;
