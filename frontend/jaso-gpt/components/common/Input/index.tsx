import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = ({ ...props }: Props) => {
  return <S.Frame {...props} />;
};

export default Input;
