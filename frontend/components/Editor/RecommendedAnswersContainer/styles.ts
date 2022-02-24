import ButtonComponent from "@/components/_common/Button";
import ToolTipComponent from "@/components/_common/ToolTip";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const MetaInfo = styled.div`
  align-self: center;
  width: 450px;
  height: 20px;
  border-radius: 10px;
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${BORDER.GRAY_300};
  border-radius: 10px;
  padding: 0.5rem;
`;

export const AdditionalInfo = styled.span`
  text-align: center;
  width: 100%;
`;

export const ToolTip = styled(ToolTipComponent)`
  margin-bottom: 10px;
  border: none;
`;

export const ChangeSpecButton = styled(ButtonComponent)`
  background-color: ${PALETTE.BLUE};
  font-weight: 900;
  color: ${PALETTE.WHITE};
  font-size: 1rem;
`;

export const ReloadAnswersButton = styled(ButtonComponent)`
  width: 100%;
  height: fit-content;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 10px;
  background-color: ${PALETTE.HOT_PINK};
  color: ${PALETTE.WHITE};
  ${BORDER.GRAY_150};
`;

export const NoResultFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  transition: all 0.1s linear;
  border-radius: 10px;
  ${BORDER.GRAY_150};

  &:hover {
    background-color: ${PALETTE.GRAY_150};
  }
`;

export const LoadingImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnswerNotice = styled.div`
  width: fit-content;
  height: fit-content;
  min-height: 20px;
  border: 1px solid ${PALETTE.GRAY_200};
`;
