import RecommendArticle from "@/components/Editor/RecommendArticle";
import RecommendedIntroductionContainer from "@/components/Editor/RecommendedIntroductionContainer";
import SELF_INTRODUCTION_ARTICLE_INFO from "@/constants/selfIntroductionArticleInfo";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import shuffle from "@/utils/shuffle";
import { MutableRefObject, RefObject, useState } from "react";
import * as S from "./styles";

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
  const [selectedTab, setSelectedTab] = useState<"RecommendedIntroductions" | "RecommendedArticle" | "SpellingCheck">(
    "RecommendedIntroductions"
  );

  const onClickSpellingCheckButton = () => {
    getSpellInfo();
  };

  return (
    <S.Frame {...props}>
      <S.Nav>
        <S.NavButton
          type="button"
          onClick={() => setSelectedTab("RecommendedIntroductions")}
          isSelected={selectedTab === "RecommendedIntroductions"}
        >
          AI 추천 자소서
        </S.NavButton>
        <S.NavButton
          type="button"
          onClick={() => setSelectedTab("RecommendedArticle")}
          isSelected={selectedTab === "RecommendedArticle"}
        >
          자소서 팁
        </S.NavButton>
        <S.NavButton
          type="button"
          onClick={() => setSelectedTab("SpellingCheck")}
          isSelected={selectedTab === "SpellingCheck"}
        >
          맞춤법 검사기
        </S.NavButton>
      </S.Nav>

      <S.SideBarContentWrapper>
        {selectedTab === "RecommendedIntroductions" && (
          <S.TabWrapper>
            <RecommendedIntroductionContainer />
          </S.TabWrapper>
        )}
        {selectedTab === "RecommendedArticle" && (
          <S.TabWrapper>
            {shuffle(SELF_INTRODUCTION_ARTICLE_INFO).map(({ title, link }, index) => {
              return <RecommendArticle key={index + link} link={link} title={title} />;
            })}
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
