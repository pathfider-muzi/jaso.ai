import CheckBox from "@/components/_common/CheckBox";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isChecked: boolean;
  text: string;
}

const CheckBoxWithLabel = ({ isChecked, onChange, text, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <CheckBox checked={isChecked} name="checkbox" onChange={onChange} />
      <S.Text>{text}</S.Text>
    </S.Frame>
  );
};

export default CheckBoxWithLabel;
