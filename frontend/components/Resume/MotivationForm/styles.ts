import ButtonComponent from "@/components/_common/Button";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    left: 7rem;
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

export const Line = styled.div`
  width: 100%;
  ${BORDER.GRAY_300};
  height: 0;
  margin-bottom: 1rem;
`;
