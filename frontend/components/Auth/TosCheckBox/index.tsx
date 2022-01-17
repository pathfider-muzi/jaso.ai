import CheckBox from "@/components/_common/CheckBox";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  isChecked: boolean;
  onClick: () => void;
  text: string;
}

const TosCheckBox = ({ isChecked, onClick, text }: Props) => {
  return (
    <S.Frame onClick={onClick}>
      <CheckBox checked={isChecked} name="checkbox" />
      <S.Text>{text}</S.Text>
    </S.Frame>
  );
};

export default TosCheckBox;
