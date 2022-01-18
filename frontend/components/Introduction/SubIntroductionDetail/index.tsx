import SERVICE_KEYWORD from "@/constants/serviceKeyword";
import * as S from "./styles";

interface Props {
  title: string;
  order: number;
  text: string;
  keyword: typeof SERVICE_KEYWORD[number];
}

const SubIntroductionDetail = ({ keyword, title, order, text, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <S.OrderCircle keyword={keyword}>{order}</S.OrderCircle>
      <S.Keyword keyword={keyword}>{keyword}</S.Keyword>
      <S.Title>{title}</S.Title>
      <S.Text>{text}</S.Text>
    </S.Frame>
  );
};

export default SubIntroductionDetail;
