import * as S from "./styles";

const IntroductionsRecommend = () => {
  return (
    <S.Frame>
      <S.SearchBarFrame>
        <S.SearchInput placeholder="기업명"></S.SearchInput>
        <S.SearchInput placeholder="직무"></S.SearchInput>
        <S.SearchInput placeholder="키워드"></S.SearchInput>
      </S.SearchBarFrame>
    </S.Frame>
  );
};

export default IntroductionsRecommend;
