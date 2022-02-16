import ScreenComponent from "@/components/_layouts/Screen";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  width: 100%;
  margin: 0 7rem;
`;

export const Header = styled.div`
  width: 100%;
  padding: 1.5rem 0;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
