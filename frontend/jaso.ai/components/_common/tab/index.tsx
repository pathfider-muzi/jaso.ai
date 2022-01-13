import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  children: ReactNode;
}

const Tab = ({ children }: Props) => {
  return <S.Frame>{children}</S.Frame>;
};

export default Tab;
