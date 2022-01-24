import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const CheckBox = ({ checked, children, onChange, ...props }: Props) => {
  return <S.Frame type="checkbox" checked={checked} role="button" onChange={onChange} {...props} />;
};

export default CheckBox;
