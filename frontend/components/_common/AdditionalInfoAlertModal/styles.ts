import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import ButtonComponent from "../Button";
import Modal from "../Modal";

export const Frame = styled(Modal)``;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const LinkButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  font-size: 1.1rem;
  border: none;
  font-weight: 900;
  margin: 1rem 0 0 auto;
`;
