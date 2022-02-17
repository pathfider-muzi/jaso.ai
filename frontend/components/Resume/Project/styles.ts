import ButtonComponent from "@/components/_common/Button";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  padding: 1rem 0;
  border-top: 1px solid ${PALETTE.GRAY_200};
  &:last-child {
    border-bottom: 1px solid ${PALETTE.GRAY_200};
  }
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
  height: 2.5rem;
  margin-right: 2rem;
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

export const DeleteButton = styled.button`
  position: absolute;
  text-align: center;
  vertical-align: middle;
  font-size: 1.7rem;
  top: 2px;
  right: 6px;
  color: ${PALETTE.RED};
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
