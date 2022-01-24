import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.button`
  width: 18rem;
  height: 22rem;
  border-radius: 10px;
  ${BOX_SHADOW.DEFAULT};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s cubic-bezier(0.39, 0.575, 0.565, 1);
  font-size: 1.5rem;
  font-weight: 600;

  &:hover {
    ${BOX_SHADOW.BOLD};
  }
`;

export const Text = styled.span`
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
`;
