import HorizontalStyle from "@/components/_common/HorizontalStyle";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const TipTitle = styled.div`
  height: 35px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 13px;
  margin-right: 8px;
  width: 150px;
  border: 1px solid ${PALETTE.GRAY_200};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.09);
`;

export const TipHyperLink = styled.a`
  width: 60px;
  border-radius: 5px;
  height: 30px;
  border: 1px solid ${PALETTE.GRAY_400};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

export const Frame = styled(HorizontalStyle)<{
  height: number;
}>``;
