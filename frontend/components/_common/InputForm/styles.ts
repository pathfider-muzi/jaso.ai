import PALETTE from "@/constants/styles/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Frame as AdditionalInformationFrame,
  Label as AdditionalInformationLabel
} from "../../User/AdditionalInformation/styles";

export const Frame = styled(AdditionalInformationFrame)``;

export const Label = styled(AdditionalInformationLabel)<{
  isRequired: boolean;
}>`
  font-size: 1rem;
  ${({ isRequired }) => {
    return (
      isRequired &&
      css`
        &::after {
          content: "*";
          display: inline-block;
          vertical-align: top;
          font-weight: 700;
          color: ${PALETTE.RED};
          margin-left: 0.125rem;
          font-size: 1.25rem;
          line-height: 1.25rem;
        }
      `.styles
    );
  }}
`;
