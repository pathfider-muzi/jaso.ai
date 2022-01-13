import * as S from "./styles";

interface Props {
  height: number;
  placeholder: string;
}

const TextArea = ({ height, placeholder }: Props) => {
  return <S.Frame height={height} placeholder={placeholder}></S.Frame>;
};

export default TextArea;
