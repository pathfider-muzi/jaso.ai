import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
}

const Card = ({ text, ...props }: Props) => {
  return (
    <S.Frame type="button" {...props}>
      <S.Text>{text ? text : "제목을 입력해주세요"}</S.Text>
    </S.Frame>
  );
};

export default Card;
