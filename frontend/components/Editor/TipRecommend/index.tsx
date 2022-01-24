import * as S from "./styles";

interface Tip {
  link: string;
  title: string;
}

const TipRecommend = ({ link: tipLink, title }: Tip) => {
  return (
    <S.Frame height={8}>
      <S.TipTitle>제목: {title}</S.TipTitle>
      <S.TipHyperLink href={tipLink} target="_blank">
        링크
      </S.TipHyperLink>
    </S.Frame>
  );
};

export default TipRecommend;
