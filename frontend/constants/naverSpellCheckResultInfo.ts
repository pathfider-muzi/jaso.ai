import PALETTE from "@/constants/styles/palette";

const NAVER_SPELL_CHECK_RESULT_INFO = {
  violet_text: { category: "표준어의심", color: PALETTE.GREEN, className: "green_text" },
  green_text: { category: "띄어쓰기", color: PALETTE.GREEN, className: "green_text" },
  red_text: { category: "맞춤법", color: PALETTE.GREEN, className: "green_text" },
  blue_text: { category: "통계적교정", color: PALETTE.GREEN, className: "green_text" }
} as const;

export default NAVER_SPELL_CHECK_RESULT_INFO;
