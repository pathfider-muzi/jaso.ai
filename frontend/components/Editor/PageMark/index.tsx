import * as S from "./styles";

interface Props {
  color: string;
  number: number;
  textColor: string;
  goToPage: (number: number) => void;
}

const PageMark = ({
  color = "red",
  number = 1,
  textColor = "white",
  goToPage,
}: Props) => {
  return (
    <S.Frame
      color={color}
      textColor={textColor}
      onClick={() => goToPage(number)}
    >
      {number}
    </S.Frame>
  );
};

export default PageMark;
