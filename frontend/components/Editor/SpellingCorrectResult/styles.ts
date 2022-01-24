import ButtonComponent from "@/components/_common/Button";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import NAVER_SPELL_CHECK_RESULT_INFO from "../../../constants/naverSpellCheckResultInfo";

export const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SpellCheckForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SummitButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1rem;
  width: 200px;
  font-size: 20px;

  &:hover {
    box-shadow: black;
  }
`;

export const ColorInfo = styled.div`
  margin-top: 13px;
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

export const ErrorCountWrapper = styled.span``;

export const ErrorCount = styled.span``;

// export const ResultArea = styled.div`
//   margin-left: 1rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   ${Object.keys(NAVER_SPELL_CHECK_RESULT_INFO)
//     .map(_key => {
//       const key = _key as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;

//       return `.${key} {color: ${NAVER_SPELL_CHECK_RESULT_INFO[key].color};}`;
//     })
//     .join("")};

//   ${css`
//     .result_underline {
//       border-bottom: 1px solid ${PALETTE.BLACK_900};
//     }
//   `}
// `;

// export const ErrorCount = styled.span``;

// const Text = styled.div`
//   width: 300px;
//   height: 200px;
//   border: 1px solid ${PALETTE.GRAY_150};
//   box-shadow: 8px 5px 5px ${PALETTE.GRAY_200};
// `;

// export const Label = styled.label`
//   width: 150px;
//   height: 25px;
//   text-align: center;
//   box-shadow: -2px 3px 5px ${PALETTE.GRAY_200};
//   border: 1px solid ${PALETTE.GRAY_200};
//   border-radius: 7px;
//   margin-bottom: 10px;
// `;

export const OriginalText = styled.span`
  color: ${PALETTE.BLACK_700};
`;

export const FixedText = styled.button`
  background-color: ${PALETTE.GRAY_400};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.3rem;
`;

// export const ReflectButton = styled.button`
//   margin-top: 8px;
//   font-size: 15px;
//   width: 110px;
//   height: 40px;
//   border-radius: 5rem;
//   border: 1px solid ${PALETTE.GRAY_300};
//   box-shadow: 8px 5px 5px ${PALETTE.GRAY_200};

//   &:hover {
//     animation: slide 3s linear;
//     transition-timing-function: ease-in-out;
//     transform: translateY(3px) translateX(5px);
//   }
// `;