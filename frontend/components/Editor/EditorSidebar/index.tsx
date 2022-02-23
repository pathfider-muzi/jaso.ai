import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import { MutableRefObject, RefObject, useState } from "react";
import RecommendedAnswersContainer from "../RecommendedAnswersContainer";
import * as S from "./styles";

const TAB_TYPES = ["RecommendAnswerFromQuestion", "SpellingCheck"] as const;

const TAB_NAMES = ["ai 추천 답변", "맞춤법 검사기"];

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
  setEmphasizedQuestion: (isEmphasized: boolean) => void;
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
  setEmphasizedQuestion,
  ...props
}: Props) => {
  type TabType = typeof TAB_TYPES[number];

  const [selectedTab, setSelectedTab] = useState<TabType>(TAB_TYPES[0]);

  const onClickSpellingCheckButton = () => {
    getSpellInfo();
  };

  const additionalInfoInput = useAdditionalInfoInput();

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
        {selectedTab === "RecommendAnswerFromQuestion" && (
          <S.TabWrapper>
            <RecommendedAnswersContainer
              setEmphasizedQuestion={setEmphasizedQuestion}
              additionalInfoInput={additionalInfoInput}
            />
          </S.TabWrapper>
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
