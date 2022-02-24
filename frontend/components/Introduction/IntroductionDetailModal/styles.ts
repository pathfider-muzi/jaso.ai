import ButtonComponent from "@/components/_common/Button";
import Modal from "@/components/_common/Modal";
import ToolTipComponent from "@/components/_common/ToolTip";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled(Modal)`
  overflow-y: scroll;
`;

export const IntroductionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  box-shadow: ${BOX_SHADOW.BOLD};
  border: 1px solid ${PALETTE.GRAY_200};
  padding: 1rem;
  min-height: 250px;
  max-height: 500px;
  border-radius: 10px;
  overflow-y: scroll;
  margin-right: 1rem;
  white-space: break-spaces;
  text-align: left;
`;
export const ContentWrapper = styled.div`
  overflow-y: scroll;
  height: 15rem;
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: 10px;
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
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export const ReportFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ReportButton = styled(ButtonComponent)`
  margin-top: 8px;
  text-align: center;
  background-color: ${PALETTE.RED};
  color: ${PALETTE.WHITE};
  font-weight: 900;
  font-size: 1rem;
`;

export const FieldFrame = styled.div`
  width: 100%;
  display: flex;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
`;

export const ReportLetter = styled.div`
  margin-left: 4px;
`;

export const ToolTip = styled(ToolTipComponent)`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  text-align: center;
  vertical-align: middle;
  width: 1.5rem;
  height: 1.5rem;
`;
