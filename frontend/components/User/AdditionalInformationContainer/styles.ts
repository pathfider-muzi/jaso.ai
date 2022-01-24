import ButtonComponent from "@/components/_common/Button";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${BOX_SHADOW.DEFAULT}
  background-color: transparent;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  min-width: 450px;
`;

export const Header = styled.div`
  position: relative;
`;

export const Title = styled.h2`
  font-weight: 500;
`;

export const EditButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0;
  top: 0;
`;

export const InfoList = styled.div`
  & > div {
    margin-top: 2rem;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const DeleteUserButton = styled(ButtonComponent)`
  background-color: ${PALETTE.RED};
  color: ${PALETTE.WHITE};
  font-size: 1.1rem;
  border: none;
  font-weight: 900;
`;
