import useRecommendAnswers from "@/hooks/Editor/useRecommendAnswer";
import { getUserInfoString } from "@/hooks/useUser";
import { RootState } from "@/modules";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import RecommendedAnswer from "../RecommendedAnswer";
import * as S from "./styles";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useModal from "@/hooks/useModal";
import AdditionalInformationModal from "@/components/User/AdditionalInformationModal";

interface Props {
  setEmphasizedQuestion: (isEmphasized: boolean) => void;
}

const RecommendedAnswersContainer = ({ setEmphasizedQuestion: setEmphasizedTitle }: Props) => {
  const {
    university,
    major,
    grade,
    languageScore,
    career,
    activity,
    licenses,
    onChangeUniversity,
    onChangeMajor,
    onChangeGrade,
    onChangeLanguageScore,
    onChangeCareer,
    onChangeActivity,
    onChangeLicenses
  } = useAdditionalInfoInput();

  const specification = getUserInfoString({
    university,
    major,
    grade,
    languageScore,
    career,
    activity,
    license: licenses.join(" / ")
  });

  const currentQuestionTitle = useSelector(
    (state: RootState) => state.recommendedAnswerOfQuestionReducer.currentQuestionTitle
  );

  const SELF_ANSWER_AMOUNT_UNIT = 3;
  const LIMIT_ANSWER_NUM = 100;

  console.log(currentQuestionTitle);

  const { data: recommendedAnswers, refetch } = useRecommendAnswers({
    enabled: true,
    metaInfo: {
      listNum: LIMIT_ANSWER_NUM,
      question: currentQuestionTitle,
      specification: specification
    }
  });
  const { isModalOpen, closeModal, openModal } = useModal({
    defaultValue: false
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

  const onClickSaveButton = () => {
    closeModal();
  };

  useEffect(() => {
    if (specification === "- / - / - / - / - / - / -") return;
    console.log(specification);
    refetch();
  }, [specification]);

  return (
    <S.Frame>
      <S.MetaInfo>질문 내용과 스펙을 바탕으로 자기소개서 문단을 추천해줍니다.</S.MetaInfo>
      <S.AdditionalInfo>
        {specification}
        <S.ChangeSpecButton type="button" onClick={openModal}>
          변경
        </S.ChangeSpecButton>
      </S.AdditionalInfo>
      <AdditionalInformationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onClickSaveButton={onClickSaveButton}
        additionalInput={{
          university,
          major,
          grade,
          languageScore,
          career,
          activity,
          licenses,
          onChangeUniversity,
          onChangeMajor,
          onChangeGrade,
          onChangeLanguageScore,
          onChangeCareer,
          onChangeActivity,
          onChangeLicenses
        }}
      />
      {recommendedAnswers ? (
        <S.ReloadAnswersButton
          onMouseLeave={() => setEmphasizedTitle(false)}
          onMouseOver={() => setEmphasizedTitle(true)}
          onClick={() => {
            refetch();
          }}
        >
          추천된 자기소개서 답변 불러오기
        </S.ReloadAnswersButton>
      ) : (
        <></>
      )}
      {recommendedAnswers ? (
        recommendedAnswers
          .slice(0, recommendedAnswersAmount)
          .map(({ body: recommendedAnswer, spec }, index: number) => {
            const specArray = spec.split("/");
            const question = specArray[0];
            return (
              <RecommendedAnswer key={index} answer={recommendedAnswer} question={question} tags={specArray.slice(1)} />
            );
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
