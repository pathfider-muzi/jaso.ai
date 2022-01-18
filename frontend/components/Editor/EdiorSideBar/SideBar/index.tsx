import VerticalStyle from "@/components/_common/VerticalStyle";
import { useState } from "react";
import { TAB_CONTENT_VIEW, TAB_SIDEBAR } from "@/constants/tabSideBarStyle";
import TabBar from "../TabBar";
import TabContentView from "../TabContentView";
import SpellChecker from "../../SpellChecker";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxFolder";

const EditorSideBar = () => {
  const editorContent = useSelector((state: RootState) => state.editorReducer.text);

  const tabContentViews = [
    "자소서 ui",
    "자소서 아티클 추천",
    <SpellChecker key="1" text={editorContent}></SpellChecker>
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
