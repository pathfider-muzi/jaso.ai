import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  children: ReactNode;
}

const TipRecommend = ({ children }: Props) => {
  return <S.Frame width={400}></S.Frame>;
};

export default TipRecommend;
