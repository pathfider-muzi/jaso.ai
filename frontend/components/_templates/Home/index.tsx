import Screen from "@/components/_layouts/Screen";
import BRAND_NAME from "@/constants/brandName";
import * as S from "./styles";

const Home = () => {
  return (
    <Screen title="홈" description={`AI 자소서 assistant, ${BRAND_NAME} 홈페이지`}>
      <S.MainIntroduction />
    </Screen>
  );
};

export default Home;
