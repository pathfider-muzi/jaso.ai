import PALETTE from "@/constants/palette";
import SERVICE_KEYWORD from "@/constants/serviceKeyword";
import SERVICE_KEYWORD_THEME from "@/constants/styles/serviceKeywordTheme";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100;
  justify-content: space-around;
  align-items: center;
`;

export const OrderCircle = styled.div<{
  keyword: typeof SERVICE_KEYWORD[number];
}>`
  display: inline-flex;
  border-radius: 100%;
  color: ${PALETTE.BLACK_900};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 1.5rem;
  ${({ keyword }) => {
    return SERVICE_KEYWORD_THEME[keyword];
  }}
`;

export const Keyword = styled.div<{
  keyword: typeof SERVICE_KEYWORD[number];
}>`
  font-size: 2rem;
  text-align: center;
  user-select: none;
  font-weight: 800;
  letter-spacing: -0.03em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 0.05rem;
  ${({ keyword }) => {
    return SERVICE_KEYWORD_THEME[keyword];
  }}
`;

export const Title = styled.h4`
  text-align: center;
  margin: 1.5rem 0;
  padding-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  font-size: 3.75rem;
`;

export const Text = styled.p`
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.02em;
  margin: 0;
  font-weight: 300;
`;
