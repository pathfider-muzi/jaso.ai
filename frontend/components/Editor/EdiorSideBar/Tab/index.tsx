import { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";

interface Props {
  children: ReactNode;
  onClick: (curNumber: number) => void;
  activeTabValue: number;
  curNumber: number;
}

const Tab = ({ children, onClick, activeTabValue, curNumber }: Props) => {
  const [activeTab, setActiveTab] = useState(activeTabValue);

  console.log(activeTab);
  console.log(curNumber);
  console.log(activeTab === curNumber);

  useEffect(() => {
    setActiveTab(activeTabValue);
  }, [activeTabValue]);

  return (
    <S.Frame
      isClicked={activeTab === curNumber}
      onClick={() => {
        onClick(curNumber);
      }}
    >
      {children}
    </S.Frame>
  );
};

export default Tab;
