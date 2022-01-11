import { BOX_SHADOW } from "@/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.div`
  background-color: transparent;
  border-radius: 10px;
  ${BOX_SHADOW.DEFAULT}
  padding: 2rem;
  width: 100%;
  min-width: 450px;
`;

export const Title = styled.h2`
  font-weight: 500;
`;

export const InfoList = styled.div`
  & > div {
    margin-top: 2rem;
  }
`;
