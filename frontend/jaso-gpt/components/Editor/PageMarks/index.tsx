import { ReactNode } from "react";
import * as S from "./styles";

export type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  children: ReactNode;
}

const PageMarks = ({ size = "md", children }: Props) => {
  return <S.Frame size={size}>{children}</S.Frame>;
};

export default PageMarks;
