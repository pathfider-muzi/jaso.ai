import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  height: 29rem;
  width: 28rem;
`;

export const SpellErrorWrapper = styled.div`
  color: ${PALETTE.BLACK_900};
  z-index: 0;
  overflow-y: hidden;
  white-space: pre-wrap;
  height: 29rem;
  width: 28rem;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;

  > {
    color: ${PALETTE.BLACK_900};
  }

  > .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.violet_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.violet_text.color};
  }
  > .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.blue_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.blue_text.color};
  }
  > .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.green_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.green_text.color};
  }
  > .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.red_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.red_text.color};
  }
`;

export const TextArea = styled.textarea`
  background-color: transparent;
  color: transparent;
  caret-color: ${PALETTE.BLACK_900};
  height: 29rem;
  width: 28rem;
  padding: 1rem;
  outline: none;
  resize: none;
  box-shadow: none;
  font-size: 1rem;
  position: absolute;
  top: 0px;
  left: 0px;
  ${BORDER.GRAY_150};
`;