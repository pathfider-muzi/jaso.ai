import ButtonComponent from "@/components/_common/Button";
import ScreenComponent from "@/components/_layouts/Screen";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Frame = styled.div`
  width: 100%;
  display: flex;
  min-height: 60rem;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TitleInput = styled.input`
  font-size: 2rem;
  line-height: 2rem;
  color: ${PALETTE.BLACK_700};
  font-weight: 500;
  border: none;
  outline: none;
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: fit-content;
  gap: 0.5rem;
  margin-left: 1rem;
`;

export const SaveButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  color: ${PALETTE.WHITE};
  font-size: 1.1rem;
  border: none;
  font-weight: 900;
`;

export const SignUpButton = styled(ButtonComponent)`
  background-color: ${PALETTE.ORANGE};
  color: ${PALETTE.WHITE};
  border: none;
  font-weight: 700;
  margin-left: 0.5rem;
  padding: 7px 12px;
`;

export const ResumePdfPreviewToggleButton = styled(ButtonComponent)`
  background-color: ${PALETTE.WHITE};
  color: ${PALETTE.BLACK_700};
  font-size: 1.1rem;
  border: none;
  font-weight: 900;
  width: max-content;
`;

export const ResumeForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ResumeInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FieldName = styled.span`
  padding: 40px 0 6px;
  font-size: 1rem;
  font-weight: 500;
  color: ${PALETTE.BLACK_700};
  border-bottom: 1px solid ${PALETTE.GRAY_500};
`;

export const FieldGuide = styled.p`
  white-space: pre-wrap;
  padding: 0.8rem;
  background-color: ${PALETTE.GRAY_120};
  font-size: 0.85rem;
  line-height: 1.42;
  letter-spacing: normal;
  color: ${PALETTE.BLACK_700};
  margin: 0.8rem 0;
  display: flex;
  align-items: center;
`;

export const ProjectFormWrapper = styled.div`
  position: relative;
  padding: 1rem 0;
  border-top: 1px solid ${PALETTE.GRAY_200};
  &:last-child {
    border-bottom: 1px solid ${PALETTE.GRAY_200};
  }
`;

export const LoadingImageWrapper = styled.div`
  height: 2.5rem;
  margin-right: 2rem;
`;
