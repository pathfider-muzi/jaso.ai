import SERVICE_KEYWORD_THEME from "@/constants/styles/serviceKeywordTheme";
import verticalStyle from "@/constants/styles/verticalStyle";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.section`
  ${verticalStyle};
  width: 100%;
  user-select: none;
  text-align: center;
  font-size: 6rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Text = styled.span<{
  order: number;
}>`
  margin-bottom: 1rem;
  padding: 0 0.05rem;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.3;

  ${({ order }) => {
    if (order === 0) {
      return css`
        animation: "first-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME[order].styles}
      `;
    } else if (order === 1) {
      return css`
        animation: "second-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME[order].styles}
      `;
    } else if (order === 2) {
      return css`
        animation: "third-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME[order].styles}
      `;
    }
  }}
`;
