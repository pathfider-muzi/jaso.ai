import CardComponent from "@/components/_common/Card";
import ScreenComponent from "@/components/_layouts/Screen";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  width: 100%;
  margin: 0 7rem;
`;

export const Header = styled.div`
  width: 100%;
  padding: 1.5rem 0;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const Card = styled(CardComponent)`
  width: 12rem;
  height: 15rem;
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

export const PlusCard = styled(CardComponent)`
  width: 12rem;
  height: 15rem;
  font-size: 9.5rem;
  font-weight: 100;
`;
