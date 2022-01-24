import * as S from "./styles";

interface Props {
  title: string;
  order: number;
  text: string;
  keyword: string;
}

const SubIntroductionDetail = ({ keyword, title, order, text, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <S.OrderCircle order={order}>{order + 1}</S.OrderCircle>
      <S.Keyword order={order}>{keyword}</S.Keyword>
      <S.Title>{title}</S.Title>
      <S.Text>{text}</S.Text>
    </S.Frame>
  );
};

export default SubIntroductionDetail;
