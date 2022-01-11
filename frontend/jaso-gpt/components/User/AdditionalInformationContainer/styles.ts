import { BOX_SHADOW } from "@/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${BOX_SHADOW.DEFAULT}
  background-color: transparent;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  min-width: 450px;
`;

export const Header = styled.div`
  position: relative;
`;

export const Title = styled.h2`
  font-weight: 500;
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0;
  top: 0;
`;

export const InfoList = styled.div`
  & > div {
    margin-top: 2rem;
  }
`;
