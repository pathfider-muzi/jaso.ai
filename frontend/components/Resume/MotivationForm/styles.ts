import ButtonComponent from "@/components/_common/Button";
import PALETTE from "@/constants/styles/palette";
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

export const LoadingImageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  margin-right: 2rem;
  margin-bottom: 1rem;

  & > span {
    margin-left: 1rem;
  }
`;
