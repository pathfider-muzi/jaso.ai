import ScreenComponent from "@/components/_layouts/Screen";
import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  display: flex;
  flex-direction: column;
  padding: 6rem;
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  ${BORDER.GRAY_300};
  ${BOX_SHADOW.DEFAULT}
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Notice = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  padding: 1rem 0;
  font-size: 1.5rem;
`;

export const Date = styled.time``;

export const Content = styled.div`
  margin-top: 0.5rem;
  padding: 1rem 0.5rem;
  border-top: 1px solid ${PALETTE.BLACK_900};
  background-color: ${PALETTE.GRAY_150};
  word-break: break-all;
  white-space: break-spaces;
`;
