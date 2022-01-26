import RecommendArticle from "@/components/Editor/RecommendArticle";
import RecommendedIntroduction from "@/components/Editor/RecommendedIntroduction";
import SELF_INTRODUCTION_ARTICLE_INFO from "@/constants/selfIntroductionArticleInfo";
import useSelfIntroductionRecommend from "@/hooks/useSelfIntroductionRecommend";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import Image from "next/image";
import { MutableRefObject, RefObject, useState } from "react";
import * as S from "./styles";

const SELF_INTRODUCTION_AMOUNT_UNIT = 3;

interface Props {
  spellingCorrectorData: ReturnType<typeof useSpellingCorrecter>["data"];
  errorSpellingData: ReturnType<typeof useSpellingCorrecter>["errorData"];
  originalSpellingData: string[];
  isFetchedAll: boolean;
  spellingResultsRefs: MutableRefObject<RefObject<HTMLSpanElement>[] | undefined>;
  getSpellInfo: () => void;
  answer: string;
  setAnswer: (value: string) => void;
}

const EditorSidebar = ({
  spellingCorrectorData,
  originalSpellingData,
  isFetchedAll,
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

  const [recommendedSelfIntroductionAmount, setRecommendedSelfIntroductionAmount] =
    useState(SELF_INTRODUCTION_AMOUNT_UNIT);

  const { recommendedIntroductions } = useSelfIntroductionRecommend({ enabled: true });

  const canShowMoreRecommendedSelfIntroductions =
    recommendedSelfIntroductionAmount + SELF_INTRODUCTION_AMOUNT_UNIT <= (recommendedIntroductions?.length || 0);

  const onClickShowMoreRecommendedSelfIntroductionButton = () => {
    if (!canShowMoreRecommendedSelfIntroductions) return;

    setRecommendedSelfIntroductionAmount(state => {
      return state + SELF_INTRODUCTION_AMOUNT_UNIT;
    });
  };

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
            {!recommendedIntroductions && <Image src="/loading.svg" alt="loading image" width="100" height="100" />}
            {recommendedIntroductions
              ?.slice(0, recommendedSelfIntroductionAmount)
              .map((recommendedIntroduction, index) => {
                return (
                  <RecommendedIntroduction key={recommendedIntroduction.title + index} {...recommendedIntroduction} />
                );
              })}
            {canShowMoreRecommendedSelfIntroductions && (
              <S.ShowMoreButton onClick={onClickShowMoreRecommendedSelfIntroductionButton} type="button">
                더보기
              </S.ShowMoreButton>
            )}
          </S.TabWrapper>
        )}
        {selectedTab === "RecommendedArticle" && (
          <S.TabWrapper>
            {SELF_INTRODUCTION_ARTICLE_INFO.map(({ title, link }, index) => {
              return <RecommendArticle key={index + link} link={link} title={title} />;
            })}
          </S.TabWrapper>
        )}
        {selectedTab === "SpellingCheck" && (
          <S.TabWrapper>
            <S.SpellingCheckButton type="button" onClick={onClickSpellingCheckButton}>
              맞춤법검사
            </S.SpellingCheckButton>
            <S.SpellingCorrectResult
              originalData={originalSpellingData}
              isFetchedAll={isFetchedAll}
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
