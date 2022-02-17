import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const ReloadAnswersButton = styled.button`
  border: 1px solid ${PALETTE.GRAY_200};
  width: 200px;
  height: 20px;
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
