import ModalComponent from "@/components/_common/Modal";
import PALETTE from "@/constants/palette";
import styled from "@emotion/styled";

export const Frame = styled(ModalComponent)`
  min-height: fit-content;
  min-width: fit-content;
`;

export const ButtonsWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MoveSignUpButton = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  color: ${PALETTE.GRAY_500};
  border-bottom: 1px solid ${PALETTE.GRAY_500};
`;
