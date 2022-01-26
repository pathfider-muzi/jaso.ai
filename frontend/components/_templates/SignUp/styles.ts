import ScreenComponent from "@/components/_layouts/Screen";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  border-radius: 10px;
  padding: 2rem;
  min-width: 540px;
  max-width: 1000px;
  height: fit-content;
  ${BOX_SHADOW.DEFAULT}
`;

export const Header = styled.div`
  padding-top: 0.6rem;
  font-weight: 500;
  font-size: 2rem;
`;

export const Body = styled.div`
  padding-top: 1rem;
  width: 100%;
  height: 100%;
`;

export const InputsWrapper = styled.div`
  & > div {
    margin-top: 2rem;
  }

  font-size: 1.5rem;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
