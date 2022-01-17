import ButtonComponent from "@/components/_common/Button";
import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import PALETTE from "@/constants/palette";
import BORDER from "@/styles/border";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpellCheckForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  resize: none;
  ${BORDER.GRAY_150}
  padding: 1rem;
`;

export const SummitButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  margin-left: 1rem;
  width: fit-content;
`;

export const ResultArea = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Object.keys(NAVER_SPELL_CHECK_RESULT_INFO)
    .map(_key => {
      const key = _key as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;

      return `.${key} {color: ${NAVER_SPELL_CHECK_RESULT_INFO[key].color};}`;
    })
    .join("")};

  ${css`
    .result_underline {
      border-bottom: 1px solid ${PALETTE.BLACK_900};
    }
  `}
`;

export const ErrorCount = styled.span``;

export const OriginalText = styled.span``;

export const FixedText = styled.span``;

export const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
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
