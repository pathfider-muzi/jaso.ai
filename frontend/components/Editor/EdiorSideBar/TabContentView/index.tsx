import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  children: ReactNode;
  width: number;
  height: number;
}

const TabContentView = ({ children, width, height }: Props) => {
  return (
    <S.Frame width={width} height={height}>
      {children}
    </S.Frame>
  );
};

export default TabContentView;
