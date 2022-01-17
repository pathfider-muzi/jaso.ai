import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const CheckBox = ({ checked, children, ...props }: Props) => {
  return <S.Frame type="checkbox" checked={checked} role="button" {...props} />;
};

export default CheckBox;
