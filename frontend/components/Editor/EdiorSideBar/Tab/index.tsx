import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Tab = ({ children, onClick }: Props) => {
  return <S.Frame onClick={onClick}>{children}</S.Frame>;
};

export default Tab;
