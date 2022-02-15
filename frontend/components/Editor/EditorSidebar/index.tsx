import RecommendedIntroductionContainer from "@/components/Editor/RecommendedIntroductionContainer";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import { MutableRefObject, RefObject, useState } from "react";
import RecommendedAnswersContainer from "../RecommendedAnswersContainer";
import * as S from "./styles";

const TAB_TYPES = [
  "RecommendedIntroductions",
  "RecommendAnswerFromQuestion",
  "CreateIntroductionFromResume",
  "SpellingCheck"
] as const;

const TAB_NAMES = ["AI 추천 자소서", "ai 추천 문항", "이력서로 자소서 생성", "맞춤법 검사기"];

interface Props {
  spellingCorrectorData: ReturnType<typeof useSpellingCorrecter>["data"];
  errorSpellingData: ReturnType<typeof useSpellingCorrecter>["errorData"];
  originalSpellingData: string[];
  isFetchedAll: boolean;
  isLoadingAll: boolean;
  spellingResultsRefs: MutableRefObject<RefObject<HTMLSpanElement>[] | undefined>;
  getSpellInfo: () => void;
  answer: string;
  setAnswer: (value: string) => void;
}

const EditorSidebar = ({
  spellingCorrectorData,
  originalSpellingData,
  isFetchedAll,
  isLoadingAll,
  spellingResultsRefs,
  getSpellInfo,
  setAnswer,
  answer,
  errorSpellingData,
  ...props
}: Props) => {
  type TabType = typeof TAB_TYPES[number];

  const [selectedTab, setSelectedTab] = useState<TabType>(TAB_TYPES[0]);

  const onClickSpellingCheckButton = () => {
    getSpellInfo();
  };

  return (
    <S.Frame {...props}>
      <S.Nav>
        {TAB_TYPES.map((tabName: typeof TAB_TYPES[number], index) => {
          return (
            <S.NavButton
              key={tabName}
              type="button"
              onClick={() => setSelectedTab(tabName)}
              isSelected={selectedTab === tabName}
            >
              {TAB_NAMES[index]}
            </S.NavButton>
          );
        })}
      </S.Nav>

      <S.SideBarContentWrapper>
        {selectedTab === "RecommendedIntroductions" && (
          <S.TabWrapper>
            <RecommendedIntroductionContainer />
          </S.TabWrapper>
        )}

        {selectedTab === "RecommendAnswerFromQuestion" && (
          <S.TabWrapper>{<RecommendedAnswersContainer></RecommendedAnswersContainer>}</S.TabWrapper>
        )}
        {selectedTab === "SpellingCheck" && (
          <S.TabWrapper>
            <S.SpellingCheckButton type="button" onClick={onClickSpellingCheckButton} disabled={isLoadingAll}>
              맞춤법검사
            </S.SpellingCheckButton>
            <S.SpellingCorrectResult
              originalData={originalSpellingData}
              isFetchedAll={isFetchedAll}
              isLoadingAll={isLoadingAll}
              data={spellingCorrectorData}
              spellingResultsRefs={spellingResultsRefs}
              setAnswer={setAnswer}
              answer={answer}
              errorSpellingData={errorSpellingData}
              getSpellInfo={getSpellInfo}
            />
          </S.TabWrapper>
        )}
      </S.SideBarContentWrapper>
    </S.Frame>
  );
};

export default EditorSidebar;
