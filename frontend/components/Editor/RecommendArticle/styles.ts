import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.a`
  width: 100%;

  text-align: center;
`;

export const Button = styled.button`
  ${BORDER.GRAY_150}
  border-radius: 10px;
  padding: 1rem;
  width: 20rem;
  transition: all 0.1s linear;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    ${BOX_SHADOW.BOLD}
  }
`;

export const Title = styled.span`
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;
