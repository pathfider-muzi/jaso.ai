import Input from "@/components/_common/Input";
import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isRequired?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputForm = ({ label, value, onChange, isRequired = false, type = "text", placeholder, ...props }: Props) => {
  return (
    <S.Frame>
      <S.Label isRequired={isRequired}>{label}</S.Label>
      <Input value={value} type={type} onChange={onChange} {...props} placeholder={placeholder ?? "-"} />
    </S.Frame>
  );
};

export default InputForm;
