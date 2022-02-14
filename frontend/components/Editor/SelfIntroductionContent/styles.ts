import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const SpellErrorWrapper = styled.div`
  color: ${PALETTE.BLACK_900};
  z-index: 0;
  white-space: pre-wrap;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  overflow-y: scroll;
  max-height: 46.5rem;

  > {
    color: ${PALETTE.BLACK_900};
  }

  .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.violet_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.violet_text.color};
  }
  .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.blue_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.blue_text.color};
  }
  .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.green_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.green_text.color};
  }
  .error-color-${NAVER_SPELL_CHECK_RESULT_INFO.red_text.className} {
    border-bottom: 3px dotted ${NAVER_SPELL_CHECK_RESULT_INFO.red_text.color};
  }

  .organization-name {
    border-bottom: 3px dotted ${PALETTE.BLACK_700};
    font-weight: 900;
  }
`;

export const TextArea = styled.textarea`
  background-color: transparent;
  color: transparent;
  caret-color: ${PALETTE.BLACK_900};
  height: 100%;
  width: 100%;
  outline: none;
  resize: none;
  box-shadow: none;
  font-size: 1rem;
  position: absolute;
  top: 0px;
  left: 0px;
  border: none;
  max-height: 46.5rem;
  overflow-y: scroll;
`;
