import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import useRecommendAnswers from "@/hooks/Editor/useRecommendAnswer";
import useUser from "@/hooks/useUser";
import { RootState } from "@/modules";
import { getLocalStorage } from "@/utils/localStorage";
import makeUserInfoJsonToString from "@/utils/makeJsonToString";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import RecommendedAnswer from "../RecommendedAnswerOfIntroduction";
import * as S from "./styles";

const RecommendedAnswersContainer = () => {
  const { user } = useUser({ enabled: true });
  const userInfo = user!.userInfos[0];

  const currentQuestionTitle = useSelector(
    (state: RootState) => state.recommendedAnswerOfQuestionReducer.currentQuestionTitle
  );

  const SELF_ANSWER_AMOUNT_UNIT = 3;
  const LIMIT_ANSWER_NUM = 100;

  const { data: recommendedAnswers, refetch } = useRecommendAnswers({
    enabled: true,
    metaInfo: {
      listNum: LIMIT_ANSWER_NUM,
      question: currentQuestionTitle,
      specification: makeUserInfoJsonToString(userInfo)
    }
  });

  const [recommendedAnswersAmount, setRecommendedAnswersAmount] = useState(SELF_ANSWER_AMOUNT_UNIT);

  const canShowMoreRecommendedAnswers =
    recommendedAnswersAmount + SELF_ANSWER_AMOUNT_UNIT <= (recommendedAnswers?.length || 0);

  const onClickShowMoreRecommendedAnswersButton = () => {
    if (!canShowMoreRecommendedAnswers) return;

    setRecommendedAnswersAmount(state => {
      return state + SELF_ANSWER_AMOUNT_UNIT;
    });
  };

  return (
    <S.Frame>
      {recommendedAnswers ? (
        <S.ReloadAnswersButton
          onClick={() => {
            refetch();
          }}
        >
          추천된 자기소개서 문항 불러오기
        </S.ReloadAnswersButton>
      ) : (
        <></>
      )}
      {recommendedAnswers ? (
        recommendedAnswers.slice(0, recommendedAnswersAmount).map(({ body: recommendedAnswer }, index: number) => {
          return <RecommendedAnswer key={index} answer={recommendedAnswer} />;
        })
      ) : (
        <S.LoadingImageWrapper>
          <Image src="/loading.svg" alt="loading image" width="100" height="100" />
        </S.LoadingImageWrapper>
      )}
      {canShowMoreRecommendedAnswers && (
        <S.ShowMoreButton onClick={onClickShowMoreRecommendedAnswersButton} type="button">
          더보기
        </S.ShowMoreButton>
      )}
    </S.Frame>
  );
};

export default RecommendedAnswersContainer;
