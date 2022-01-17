import PALETTE from "@/constants/palette";
import { BOX_SHADOW } from "@/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 10px;
  ${BOX_SHADOW.DEFAULT}
`;

export const Name = styled.span`
  color: ${PALETTE.BLACK_900};
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 1.5rem;
`;

export const Email = styled.span`
  margin-top: 0.5rem;
  color: ${PALETTE.GRAY_500};
`;

export const PhoneNumber = styled.span`
  margin-top: 0.3rem;
  color: ${PALETTE.GRAY_500};
`;