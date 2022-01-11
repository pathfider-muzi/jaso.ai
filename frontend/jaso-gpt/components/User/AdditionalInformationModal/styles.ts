import ButtonComponent from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import PALETTE from "@/constants/palette";
import styled from "@emotion/styled";

export const Frame = styled(Modal)``;

export const InfoList = styled.div`
  & > div {
    margin-top: 2rem;
  }

  font-size: 1.5rem;
`;

export const Footer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    border: none;
  }
`;

export const SaveButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  margin-left: 1rem;
`;
