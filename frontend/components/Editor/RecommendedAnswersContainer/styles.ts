import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import ToolTipComponent from "@/components/_common/ToolTip";

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
  border-radius: 20px;
  border: 1px solid ${PALETTE.GRAY_300};
`;

export const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${BORDER.GRAY_150};
  border-radius: 10px;
  padding: 1rem;
`;

export const ToolTip = styled(ToolTipComponent)`
  margin-bottom: 10px;
  border: none;
`;

export const ChangeSpecButton = styled.button`
  font-weight: 900;
`;

export const ReloadAnswersButton = styled.button`
  border: 1px solid ${PALETTE.GRAY_200};
  width: 250px;
  height: 40px;
  font-size: 18px;
  align-self: center;
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
