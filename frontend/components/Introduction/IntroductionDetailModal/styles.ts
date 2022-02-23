import Modal from "@/components/_common/Modal";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled(Modal)`
  overflow-y: scroll;
`;

export const IntroductionContent = styled.div`
  white-space: break-spaces;
`;
export const ContentWrapper = styled.div`
  overflow-y: scroll;
  height: 15rem;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.div`
  min-width: 3rem;
  width: fit-content;
  padding: 0.5rem;
  background-color: ${PALETTE.VIOLET};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
`;

export const CopyPaste = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;
