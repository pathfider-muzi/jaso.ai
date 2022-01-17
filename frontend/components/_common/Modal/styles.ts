import PALETTE from "@/constants/palette";
import BORDER from "@/styles/border";
import styled from "@emotion/styled";

export const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
`;

export const Frame = styled.div`
  ${BORDER.GRAY_150}
  background-color: ${PALETTE.WHITE};
  min-width: 540px;
  min-height: 600px;
  border-radius: 10px;
  padding: 1.5rem;
`;

export const ModalHeader = styled.div`
  padding-top: 0.6rem;
  position: relative;
`;

export const ModalTitle = styled.h2`
  font-weight: 500;
  font-size: 2rem;
`;

export const CloseButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalBody = styled.div`
  padding-top: 1rem;
  width: 100%;
  height: 100%;
`;
