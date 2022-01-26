import PALETTE from "@/constants/styles/palette";
import SERVICE_KEYWORD_THEME from "@/constants/styles/serviceKeywordTheme";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${verticalStyle};
  width: 100;
  justify-content: space-around;
`;

export const OrderCircle = styled.div<{
  order: number;
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
  ${({ order }) => {
    return SERVICE_KEYWORD_THEME[order];
  }}
`;

export const Keyword = styled.div<{
  order: number;
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
  ${({ order }) => {
    return SERVICE_KEYWORD_THEME[order];
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
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.02em;
  margin: 0;
`;
