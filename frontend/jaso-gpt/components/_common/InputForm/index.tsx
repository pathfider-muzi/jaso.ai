import Input from "@/components/_common/Input";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from "react";
import * as S from "./styles";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  isRequired?: boolean;
}

const InputForm = ({ label, value, isRequired = false, ...props }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setInputValue(value);
  };

  return (
    <S.Frame>
      <S.Label isRequired={isRequired}>{label}</S.Label>
      <Input value={inputValue} type="text" onChange={onChange} {...props} />
    </S.Frame>
  );
};

export default InputForm;
