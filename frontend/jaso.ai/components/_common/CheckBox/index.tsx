import * as S from "./styles";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const CheckBox = ({ checked, children, ...props }: Props) => {
  return <S.Frame type="checkbox" checked={checked} {...props} />;
};

export default CheckBox;
