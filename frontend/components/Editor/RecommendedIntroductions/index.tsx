import useRecommend from "@/hooks/Editor/useRecommend";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import RecommendedIntroduction from "../RecommendedIntroduction";
import * as S from "./styles";

const RecommendedIntroductions = () => {
  const { recommendedIntroductions } = useRecommend();

  return (
    <S.Frame width={500}>
      {recommendedIntroductions != undefined
        ? recommendedIntroductions.map((recommendedIntroduction: RecommendedIntroductionType, index) => (
            <RecommendedIntroduction {...recommendedIntroduction} key={index} />
          ))
        : dummyData.map((recommendedIntroduction: RecommendedIntroductionType, index) => (
            <RecommendedIntroduction {...recommendedIntroduction} key={index} />
          ))}
    </S.Frame>
  );
};

const dummyData = [
  {
    title: "꿈을 키우기 위해 노력하는 자소서",
    body: `보고, 교수님께 직접 찾아가 차트 분석 방법을 배우는 등 다양한 노력을 하였습니다. 그러자 점점 투자의 감을 얻었고 평균 매입단가가 낮아진 상태에서 투자한 종목이 상승세를 띄자 10% 이상의 수익률을 얻게 되었습니다. 그 후 이들 산업의 미래 방향성을 토대로 구체적인 포트폴리오를 작성하였고, 결과적으로 모의투자 ‘1등’이라는 성과를 가져오게 되었습니다.
  
    이를 통해, 처음 접하는 낯섦에도 불구하고 도전정신을 가지며 열정적으로 나아가는 자세를 배웠습니다. 앞선 사례를 밑거름 삼아 새로운 업무에 두려움을 갖지 않는 태도와 독창적 아이디어로 NH 농협은행의 혁신적인 성과를 이룩하는 실력 있는 농협인으로 거듭나겠습니다.
    
    AFPK 자격증 취득을 통해 개인 자산관리 분야의 전문성을 갖추었습니다. 또한 전공수업으로 재무, 회계의 과정을 마스터하였고 기업 재무제표 분석능력 등을 키웠습니다.
    
    
    
    대학생 대외활동 공모전 채용 사이트 링커리어 https://linkareer.com/ `,
    spec: "3d",
    tags: ["은행", "언어", "가짜데이터"]
  },
  {
    title: "꿈을 키우기 위해 노력하는 자소서",
    body: `보고, 교수님께 직접 찾아가 차트 분석 방법을 배우는 등 다양한 노력을 하였습니다. 그러자 점점 투자의 감을 얻었고 평균 매입단가가 낮아진 상태에서 투자한 종목이 상승세를 띄자 10% 이상의 수익률을 얻게 되었습니다. 그 후 이들 산업의 미래 방향성을 토대로 구체적인 포트폴리오를 작성하였고, 결과적으로 모의투자 ‘1등’이라는 성과를 가져오게 되었습니다.
  
    이를 통해, 처음 접하는 낯섦에도 불구하고 도전정신을 가지며 열정적으로 나아가는 자세를 배웠습니다. 앞선 사례를 밑거름 삼아 새로운 업무에 두려움을 갖지 않는 태도와 독창적 아이디어로 NH 농협은행의 혁신적인 성과를 이룩하는 실력 있는 농협인으로 거듭나겠습니다.
    
    AFPK 자격증 취득을 통해 개인 자산관리 분야의 전문성을 갖추었습니다. 또한 전공수업으로 재무, 회계의 과정을 마스터하였고 기업 재무제표 분석능력 등을 키웠습니다.
    
    
    
    대학생 대외활동 공모전 채용 사이트 링커리어 https://linkareer.com/ `,
    tags: ["은행", "언어", "가짜데이터"],
    spec: "한양대"
  },
  {
    title: "꿈을 키우기 위해 노력하는 자소서",
    body: `보고, 교수님께 직접 찾아가 차트 분석 방법을 배우는 등 다양한 노력을 하였습니다. 그러자 점점 투자의 감을 얻었고 평균 매입단가가 낮아진 상태에서 투자한 종목이 상승세를 띄자 10% 이상의 수익률을 얻게 되었습니다. 그 후 이들 산업의 미래 방향성을 토대로 구체적인 포트폴리오를 작성하였고, 결과적으로 모의투자 ‘1등’이라는 성과를 가져오게 되었습니다.
  
    이를 통해, 처음 접하는 낯섦에도 불구하고 도전정신을 가지며 열정적으로 나아가는 자세를 배웠습니다. 앞선 사례를 밑거름 삼아 새로운 업무에 두려움을 갖지 않는 태도와 독창적 아이디어로 NH 농협은행의 혁신적인 성과를 이룩하는 실력 있는 농협인으로 거듭나겠습니다.
    
    AFPK 자격증 취득을 통해 개인 자산관리 분야의 전문성을 갖추었습니다. 또한 전공수업으로 재무, 회계의 과정을 마스터하였고 기업 재무제표 분석능력 등을 키웠습니다.
    
    
    
    대학생 대외활동 공모전 채용 사이트 링커리어 https://linkareer.com/ `,
    tags: ["은행", "언어", "가짜데이터"],
    spec: "서울대"
  }
];

export default RecommendedIntroductions;
