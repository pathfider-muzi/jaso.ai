import getRecommendAnswers from "@/api/recommendAnswers";
import AdditionalInformationModal from "@/components/User/AdditionalInformationModal";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useModal from "@/hooks/useModal";
import { getUserInfoString } from "@/hooks/useUser";
import { RootState } from "@/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecommendedAnswer from "../RecommendedAnswer";
import * as S from "./styles";

interface Props {
  setEmphasizedQuestion: (isEmphasized: boolean) => void;
  additionalInfoInput: ReturnType<typeof useAdditionalInfoInput>;
}

const SELF_ANSWER_AMOUNT_UNIT = 3;
const LIMIT_ANSWER_NUM = 100;
const EMPTY_SPEC = "- / - / - / - / - / - / -";

const RecommendedAnswersContainer = ({ setEmphasizedQuestion: setEmphasizedTitle, additionalInfoInput }: Props) => {
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
  } = additionalInfoInput;

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

  const [recommendedAnswers, setRecommendedAnswers] = useState<
    {
      body: string;
      rank: number;
      spec: string;
      id: number;
    }[]
  >([]);

  const { isModalOpen, closeModal, openModal } = useModal({
    defaultValue: false
  });

  const refetch = async () => {
    const newRecommendedAnswers = await getRecommendAnswers({
      listNum: LIMIT_ANSWER_NUM,
      question: currentQuestionTitle,
      specification: specification
    });
    setRecommendedAnswers(newRecommendedAnswers);
  };

  useEffect(() => {
    refetch();
    setRecommendedAnswersAmount(SELF_ANSWER_AMOUNT_UNIT);
  }, [specification]);

  const [recommendedAnswersAmount, setRecommendedAnswersAmount] = useState(SELF_ANSWER_AMOUNT_UNIT);

  const canShowMoreRecommendedAnswers =
    recommendedAnswersAmount + SELF_ANSWER_AMOUNT_UNIT <= (recommendedAnswers?.length || 0);

  const onClickShowMoreRecommendedAnswersButton = () => {
    if (!canShowMoreRecommendedAnswers) return;

    setRecommendedAnswersAmount(state => {
      return state + SELF_ANSWER_AMOUNT_UNIT;
    });
  };

  const onClickSaveButton = async () => {
    closeModal();
    await refetch();
  };

  return (
    <S.Frame>
      <S.MetaInfo> {"※ 질문 내용과 스펙을 바탕으로 자기소개서 문단을 추천해줍니다."}</S.MetaInfo>
      <S.AdditionalInfoWrapper>
        <S.AdditionalInfo>사용자의 스펙: {specification === EMPTY_SPEC ? "없음" : specification}</S.AdditionalInfo>
        <S.ChangeSpecButton type="button" onClick={openModal}>
          변경
        </S.ChangeSpecButton>
      </S.AdditionalInfoWrapper>
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
      {recommendedAnswers.length !== 0 ? (
        <S.ReloadAnswersButton
          onMouseLeave={() => setEmphasizedTitle(false)}
          onMouseOver={() => setEmphasizedTitle(true)}
          onClick={async () => {
            await refetch();
          }}
        >
          추천된 자기소개서 답변 불러오기
        </S.ReloadAnswersButton>
      ) : (
        <></>
      )}
      {recommendedAnswers.length !== 0 ? (
        recommendedAnswers.slice(0, recommendedAnswersAmount).map(({ body: recommendedAnswer, spec, id }) => {
          const specArray = spec.split("/");
          const question = specArray[0];

          return (
            <RecommendedAnswer
              key={id}
              answer={recommendedAnswer}
              question={question}
              tags={specArray.slice(1)}
              id={id}
            />
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
