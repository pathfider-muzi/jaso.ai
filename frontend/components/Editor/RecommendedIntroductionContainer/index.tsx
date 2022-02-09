import useUser from "@/hooks/useUser";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import { useState } from "react";
import RecommendedIntroduction from "../RecommendedIntroduction";
import * as S from "./styles";

const SELF_INTRODUCTION_AMOUNT_UNIT = 3;

interface Props {
  recommendedIntroductions: RecommendedIntroductionType[];
}

const RecommendedIntroductionContainer = ({ recommendedIntroductions }: Props) => {
  const [recommendedSelfIntroductionAmount, setRecommendedSelfIntroductionAmount] =
    useState(SELF_INTRODUCTION_AMOUNT_UNIT);

  const { userInfoString } = useUser({ enabled: false });

  const onClickShowMoreRecommendedSelfIntroductionButton = () => {
    if (!canShowMoreRecommendedSelfIntroductions) return;

    setRecommendedSelfIntroductionAmount(state => {
      return state + SELF_INTRODUCTION_AMOUNT_UNIT;
    });
  };

  const canShowMoreRecommendedSelfIntroductions =
    recommendedSelfIntroductionAmount + SELF_INTRODUCTION_AMOUNT_UNIT <= (recommendedIntroductions?.length || 0);

  return (
    <>
      {recommendedIntroductions.slice(0, recommendedSelfIntroductionAmount).map((recommendedIntroduction, index) => {
        return <RecommendedIntroduction key={recommendedIntroduction.title + index} {...recommendedIntroduction} />;
      })}

      {canShowMoreRecommendedSelfIntroductions && (
        <S.ShowMoreButton onClick={onClickShowMoreRecommendedSelfIntroductionButton} type="button">
          더보기
        </S.ShowMoreButton>
      )}
    </>
  );
};

export default RecommendedIntroductionContainer;
