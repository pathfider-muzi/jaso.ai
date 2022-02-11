import AdditionalInformationModal from "@/components/User/AdditionalInformationModal";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useModal from "@/hooks/useModal";
import useSelfIntroductionRecommend from "@/hooks/useSelfIntroductionRecommend";
import { getUserInfoString } from "@/hooks/useUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecommendedIntroduction from "../RecommendedIntroduction";
import * as S from "./styles";

const SELF_INTRODUCTION_AMOUNT_UNIT = 3;

const RecommendedIntroductionContainer = () => {
  const [recommendedSelfIntroductionAmount, setRecommendedSelfIntroductionAmount] =
    useState(SELF_INTRODUCTION_AMOUNT_UNIT);

  const { isModalOpen, closeModal, openModal } = useModal({
    defaultValue: false
  });

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

  const { getRecommendIntroductions, recommendedIntroductions } = useSelfIntroductionRecommend({
    enabled: false,
    specification
  });

  const onClickShowMoreRecommendedSelfIntroductionButton = () => {
    if (!canShowMoreRecommendedSelfIntroductions) return;

    setRecommendedSelfIntroductionAmount(state => {
      return state + SELF_INTRODUCTION_AMOUNT_UNIT;
    });
  };

  const onClickSaveButton = () => {
    closeModal();
    getRecommendIntroductions();
  };

  const canShowMoreRecommendedSelfIntroductions =
    recommendedSelfIntroductionAmount + SELF_INTRODUCTION_AMOUNT_UNIT <= (recommendedIntroductions?.length || 0);

  useEffect(() => {
    if (specification === "- / - / - / - / - / - / -") return;

    getRecommendIntroductions();
  }, [specification]);

  return (
    <>
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

      {recommendedIntroductions ? (
        recommendedIntroductions.slice(0, recommendedSelfIntroductionAmount).map((recommendedIntroduction, index) => {
          return <RecommendedIntroduction key={recommendedIntroduction.title + index} {...recommendedIntroduction} />;
        })
      ) : (
        <S.LoadingImageWrapper>
          <Image src="/loading.svg" alt="loading image" width="100" height="100" />
        </S.LoadingImageWrapper>
      )}

      {canShowMoreRecommendedSelfIntroductions && (
        <S.ShowMoreButton onClick={onClickShowMoreRecommendedSelfIntroductionButton} type="button">
          더보기
        </S.ShowMoreButton>
      )}
    </>
  );
};

export default RecommendedIntroductionContainer;
