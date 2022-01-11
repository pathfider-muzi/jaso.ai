import type { NextPage } from "next";
import Screen from "@/components/layouts/Screen";
import * as S from "./styles";

const Home: NextPage = () => {
  return (
    <Screen title="Home" description="AI 자소서 assistant, JASO-GPT 홈페이지">
      <S.ServiceIntroduction />
    </Screen>
  );
};

export default Home;
