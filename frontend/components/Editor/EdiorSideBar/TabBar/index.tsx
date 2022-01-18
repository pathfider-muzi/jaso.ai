import TAB, { TAB_SIDEBAR } from "@/constants/tabSideBarStyle";
import HorizontalStyle from "@/components/_common/HorizontalStyle";
import Tab from "../Tab";

interface Props {
  changeTabContent: (index: number) => void;
}

const TabBar = ({ changeTabContent }: Props) => {
  return (
    <HorizontalStyle height={TAB.HEIGHT_VH} width={TAB_SIDEBAR.WIDTH}>
      <Tab onClick={() => changeTabContent(0)}>ai 추천 자소서</Tab>
      <Tab onClick={() => changeTabContent(1)}>자소서 팁 아티클 추천</Tab>
      <Tab onClick={() => changeTabContent(2)}>맞춤법 검사기</Tab>
    </HorizontalStyle>
  );
};

export default TabBar;
