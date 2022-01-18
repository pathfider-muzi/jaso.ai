import PALETTE from "@/constants/palette";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
  backdrop-filter: blur(2px);
  background-image: linear-gradient(90deg, ${PALETTE.GRAY_500}, ${PALETTE.GRAY_100});
  ${BOX_SHADOW.BOLD}
`;

export const StatisticsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const Statistics = styled.div`
  border-right: 1px solid ${PALETTE.BLACK_700};
  padding: 0 2rem;
  flex-grow: 1;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;

export const StatisticsValue = styled.p`
  font-size: 3rem;
  line-height: 1.14em;
  letter-spacing: -0.05em;
  font-weight: bold;
  color: ${PALETTE.BLACK_900};
  margin: 0;
`;

export const StatisticsLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${PALETTE.BLACK_700};
`;
