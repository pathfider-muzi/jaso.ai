import SERVICE_KEYWORD from "@/components/_templates/Home/constants/serviceKeyword";
import SERVICE_KEYWORD_THEME from "@/constants/styles/serviceKeywordTheme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
  text-align: center;
  font-size: 6rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Text = styled.span<{
  keyword: typeof SERVICE_KEYWORD[number];
}>`
  margin-bottom: 1rem;
  padding: 0 0.05rem;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.3;

  ${({ keyword }) => {
    if (keyword === "Write") {
      return css`
        animation: "first-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME.Write.styles}
      `;
    } else if (keyword === "Be Recommended") {
      return css`
        animation: "second-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME["Be Recommended"].styles}
      `;
    } else if (keyword === "Complete") {
      return css`
        animation: "third-flick" 6s infinite 0s ease-in-out forwards;
        ${SERVICE_KEYWORD_THEME.Complete.styles}
      `;
    }
  }}
`;
