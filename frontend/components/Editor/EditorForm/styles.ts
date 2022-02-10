import SelfIntroductionContentComponent from "@/components/Editor/SelfIntroductionContent";
import ButtonComponent from "@/components/_common/Button";
import CheckBoxWithLabelComponent from "@/components/_common/CheckBoxWithLabel";
import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  width: 100%;
  min-width: 35rem;
  border-radius: 10px;
  margin-right: 1rem;
  ${BORDER.GRAY_150};
  ${BOX_SHADOW.DEFAULT}
  color: ${PALETTE.BLACK_900};
  ${verticalStyle};
  justify-content: flex-start;
  padding: 0.5rem 1.5rem;
  height: 100%;

  @media (max-width: 1000px) {
    min-height: 30rem;
  }
`;

export const SelfIntroductionTitleWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

export const SelfIntroductionTitle = styled.input`
  width: 100%;
  outline: 0;
  border: none;
  font-size: 1.2rem;
  font-weight: 900;
`;

export const QuestionWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

export const Question = styled.textarea`
  width: 100%;
  outline: 0;
  border: none;
  resize: none;
  font-size: 1rem;
  height: 3.5rem;
`;

export const AnswerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

export const SelfIntroductionContent = styled(SelfIntroductionContentComponent)`
  height: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${PALETTE.GRAY_500};
`;

export const TextCountWrapper = styled.div``;

export const TextCount = styled.span`
  &:focus {
    ${BORDER.GRAY_300};
  }
`;

export const TextCountInput = styled.input`
  width: 3rem;
  color: inherit;
  font-size: inherit;
`;

export const MaxCountChangeButton = styled.button`
  background-color: ${PALETTE.WHITE};
  border-radius: 10px;
  padding: 0.5rem;
  color: ${PALETTE.BLACK_700};
  ${BORDER.GRAY_150};
  margin-left: 0.5rem;
  transition: all 0.1s linear;

  &:hover {
    ${BOX_SHADOW.DEFAULT};
  }
`;

export const ChangeTextCount = styled.button`
  width: 100px;
  margin-left: 2rem;
  background-color: ${PALETTE.ORANGE};
  height: 30px;
  border-radius: 1rem;

  &:hover {
    color: ${PALETTE.WHITE};
  }
`;

export const PageMarksWrapper = styled.ul`
  position: absolute;
  left: -0.5rem;
  width: 5rem;
  height: 100%;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const PageMarkButtonWrapper = styled.li<{
  active?: boolean;
  isOptionButton?: boolean;
}>`
  ${BOX_SHADOW.DEFAULT};
  width: 100%;
  font-weight: 900;
  background-color: ${PALETTE.WHITE};
  transition: all 0.3s ease;

  ${({ active }) => {
    return (
      active &&
      css`
        background-color: ${PALETTE.VIOLET};
        color: ${PALETTE.WHITE};
      `
    );
  }};

  ${({ isOptionButton }) => {
    return (
      isOptionButton &&
      css`
        background-color: ${PALETTE.GRAY_500};
        color: ${PALETTE.WHITE};
        font-size: 1.2rem;
      `
    );
  }};
`;

export const PageMarkButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  text-align: center;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SaveButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  font-size: 1.1rem;
  border: none;
  font-weight: 900;
`;

export const CheckBoxWithLabel = styled(CheckBoxWithLabelComponent)`
  height: 2.5rem;
  margin-right: 1rem;
`;

export const LoadingImageWrapper = styled.div`
  height: 2.5rem;
  margin-right: 2rem;
`;
