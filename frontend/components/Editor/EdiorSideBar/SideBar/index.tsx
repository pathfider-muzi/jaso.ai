import VerticalStyle from "@/components/_common/VerticalStyle";
import { TAB_CONTENT_VIEW, TAB_SIDEBAR } from "@/constants/styles/tabSideBarStyle";
import { RootState } from "@/modules/rootReducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import RecommendedIntroductions from "../../RecommendedIntroductions";
import TipRecommend from "../../TipRecommend";
import TabBar from "../TabBar";
import TabContentView from "../TabContentView";
import * as S from "./styles";

const EditorSideBar = () => {
  const tabContentViews = [
    <RecommendedIntroductions key="1"></RecommendedIntroductions>,
    <S.VerticalFrame key="1">
      <TipRecommend link="https://wonny.space/writing/work/engineer-resume" title="자기소개서 쓰는 법"></TipRecommend>
      <TipRecommend link="https://ningpop.tistory.com/75" title="개발자 취업 위한 자기소개서 정리"></TipRecommend>
      <TipRecommend link="https://brunch.co.kr/@seungdols/11" title="신입 개발자 자소서 정리"></TipRecommend>
    </S.VerticalFrame>,
    <>맞춤범 검사기 컴포넌트 넣을 곳</>
  ];

  const [index, setIndex] = useState(0);

  const changeTabContent = (index: number) => {
    setIndex(index);
  };

  return (
    <VerticalStyle width={TAB_SIDEBAR.WIDTH} marginLeft={50}>
      <TabBar changeTabContent={changeTabContent}></TabBar>
      <TabContentView width={TAB_SIDEBAR.WIDTH} height={TAB_CONTENT_VIEW.HEIGHT}>
        {tabContentViews[index]}
      </TabContentView>
    </VerticalStyle>
  );
};

export default EditorSideBar;
