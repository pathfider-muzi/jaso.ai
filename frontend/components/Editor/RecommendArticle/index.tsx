import * as S from "./styles";

interface Tip {
  link: string;
  title: string;
}

const RecommendArticle = ({ link, title }: Tip) => {
  return (
    <S.Frame href={link} target="_blank" rel="noopener noreferrer">
      <S.Button type="button">
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Frame>
  );
};

export default RecommendArticle;
