import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${verticalStyle};
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ColorInfo = styled.div`
  margin-top: 13px;
  ${verticalStyle};
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const LabeledText = styled.span<{
  colorInfo: keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;
}>`
  &::before {
    content: "⦁";
    display: inline-block;
    vertical-align: middle;
    font-weight: 700;
    color: ${({ colorInfo }) => NAVER_SPELL_CHECK_RESULT_INFO[colorInfo].color};
    line-height: 1.25rem;
  }
`;

export const ErrorResultWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export const OriginalText = styled.span`
  color: ${PALETTE.BLACK_700};
`;

export const FixedText = styled.button<{
  errorColor: string;
}>`
  background-color: ${({ errorColor }) => `${errorColor}`};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.3rem;
`;
