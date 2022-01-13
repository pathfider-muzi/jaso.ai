import type { NextPage } from "next";
import Screen from "@/components/_layouts/Screen";
import * as S from "./styles";
import { BRAND_NAME } from "@/constants/brandName";

const Home: NextPage = () => {
  return (
    <Screen
      title="홈"
      description={`AI 자소서 assistant, ${BRAND_NAME} 홈페이지`}
    >
      <S.ServiceIntroduction />
    </Screen>
  );
};

export default Home;
