import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import CardComponent from "../Card";
import ToolTipComponent from "../ToolTip";

export const Frame = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
`;

export const ToolTip = styled(ToolTipComponent)`
  border: none;
`;

export const PlusCard = styled(CardComponent)`
  width: 12rem;
  height: 15rem;
  font-size: 9.5rem;
  font-weight: 100;
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const DeleteButton = styled.button`
  position: absolute;
  text-align: center;
  vertical-align: middle;
  font-size: 1.7rem;
  top: 2px;
  right: 6px;
  color: ${PALETTE.RED};
`;

export const Card = styled(CardComponent)`
  width: 12rem;
  height: 15rem;
`;
