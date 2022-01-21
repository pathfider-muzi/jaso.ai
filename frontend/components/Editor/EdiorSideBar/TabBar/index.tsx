import HorizontalStyle from "@/components/_common/HorizontalStyle";
import TAB, { TAB_SIDEBAR } from "@/constants/styles/tabSideBarStyle";
import { useState } from "react";
import Tab from "../Tab";

interface Props {
  changeTabContent: (index: number) => void;
}

const TabBar = ({ changeTabContent }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeToOtherTab = (curNumber: number) => {
    setActiveTab(curNumber);
    changeTabContent(curNumber);
  };

  return (
    <HorizontalStyle height={TAB.HEIGHT_VH} width={TAB_SIDEBAR.WIDTH}>
      <Tab onClick={changeToOtherTab} activeTabValue={activeTab} curNumber={0}>
        ai 추천 자소서
      </Tab>
      <Tab onClick={changeToOtherTab} activeTabValue={activeTab} curNumber={1}>
        자소서 팁 아티클 추천
      </Tab>
      <Tab onClick={changeToOtherTab} activeTabValue={activeTab} curNumber={2}>
        맞춤법 검사기
      </Tab>
    </HorizontalStyle>
  );
};

export default TabBar;
