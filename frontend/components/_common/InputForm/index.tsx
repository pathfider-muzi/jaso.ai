import Input from "@/components/_common/Input";
import useInput from "@/hooks/useInput";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isRequired?: boolean;
}

const InputForm = ({ label, value, isRequired = false, ...props }: Props) => {
  const { input, onChangeInput } = useInput("");

  return (
    <S.Frame>
      <S.Label isRequired={isRequired}>{label}</S.Label>
      <Input value={input} type="text" onChange={onChangeInput} {...props} />
    </S.Frame>
  );
};

export default InputForm;
