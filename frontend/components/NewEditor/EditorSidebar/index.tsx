import SpellingCorrectResult from "@/components/Editor/SpellingCorrectResult";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import useTextArea from "@/hooks/useTextArea";
import { useState } from "react";
import * as S from "./styles";

const EditorSidebar = ({ ...props }) => {
  const [selectedTab, setSelectedTab] = useState(3);
  const { input, onChangeInput, textAreaRef } = useTextArea(`안녕하세요. 외안되
  
  
  아버지가방에들어가신다`);

  const { getSpellInfo, children, originalData, isFetchedAll, errorData, spellingResultsRefs, data } =
    useSpellingCorrecter({
      text: input
    });

  return (
    <S.Frame {...props}>
      <S.Nav>
        <S.NavButton type="button" onClick={() => setSelectedTab(1)}>
          AI 추천 자소서
        </S.NavButton>
        <S.NavButton type="button" onClick={() => setSelectedTab(2)}>
          자소서 팁 아티클 추천
        </S.NavButton>
        <S.NavButton type="button" onClick={() => setSelectedTab(3)}>
          맞춤법 검사기
        </S.NavButton>
      </S.Nav>

      <S.SideBarContentWrapper>
        {selectedTab === 3 && (
          <>
            <SpellingCorrectResult
              text={input}
              originalData={originalData}
              isFetchedAll={isFetchedAll}
              data={data}
              spellingResultsRefs={spellingResultsRefs}
            />
          </>
        )}
      </S.SideBarContentWrapper>
    </S.Frame>
  );
};

export default EditorSidebar;
