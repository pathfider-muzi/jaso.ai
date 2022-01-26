import Screen from "@/components/_layouts/Screen";
import SERVICE_KEYWORD from "@/components/_templates/Home/constants/serviceKeyword";
import BRAND_NAME from "@/constants/brandName";
import * as S from "./styles";

const Home = () => {
  return (
    <Screen title="홈" description={`AI 자소서 assistant, ${BRAND_NAME} 홈페이지`}>
      <S.MainIntroduction />
      <S.SubIntroduction />
      <S.SubIntroductionDetailWrapper>
        {SERVICE_KEYWORD.map(({ keyword, title, content }, index) => {
          return <S.SubIntroductionDetail keyword={keyword} key={keyword} order={index} title={title} text={content} />;
        })}
      </S.SubIntroductionDetailWrapper>
      <S.StatisticsIntroduction
        data={[
          {
            value: "15000+",
            label: "보유 자기소개서"
          },
          {
            value: "99.99%",
            label: "GUARANTEED UPTIME"
          }
        ]}
      />
    </Screen>
  );
};

export default Home;
