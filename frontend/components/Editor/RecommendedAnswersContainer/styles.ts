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
