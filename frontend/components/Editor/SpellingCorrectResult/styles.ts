import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${verticalStyle};
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const LoadingImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorResultWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export const OriginalText = styled.span`
  color: ${PALETTE.BLACK_700};
`;

export const FixedText = styled.button<{
  errorColor: string;
}>`
  background-color: ${({ errorColor }) => `${errorColor}`};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.3rem;
`;
