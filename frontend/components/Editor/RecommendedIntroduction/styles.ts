import VerticalStyle from "@/components/_common/VerticalStyle";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled(VerticalStyle)<{ width: number; isLoginned: boolean; minHeight: number }>`
  border: 1px solid ${PALETTE.GRAY_200};

  padding-top: 10px;
  filter: ${props => (props.isLoginned ? "" : "blur(4px)")};
`;

export const IntroductionTitle = styled.div`
  font-size: 18px;
  width: 200px;
  height: 40px;
  border-radius: 8px;
  background-color: ${PALETTE.GRAY_300};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const Introduction = styled.section`
  padding: 8px;
  width: 400px;
  border: 1px solid ${PALETTE.GRAY_200};
  height: 200px;
  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;
`;

export const SpecTag = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${PALETTE.GRAY_150};
`;
