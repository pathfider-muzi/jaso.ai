import BRAND_NAME from "@/constants/brandName";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useSelfIntroductionRecommend from "@/hooks/useSelfIntroductionRecommend";
import { getUserInfoString } from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as S from "./styles";

const SELF_INTRODUCTION_AMOUNT_UNIT = 6;
const INTRODICTON_MAX_LENGTH = 50;

const RecommendSearchIntroductions = () => {
  const [recommendedSelfIntroductionAmount, setRecommendedSelfIntroductionAmount] =
    useState(SELF_INTRODUCTION_AMOUNT_UNIT);

  const { university, major, grade, languageScore, career, activity, licenses } = useAdditionalInfoInput();

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

  const canShowMoreRecommendedSelfIntroductions =
    recommendedSelfIntroductionAmount + SELF_INTRODUCTION_AMOUNT_UNIT <= (recommendedIntroductions?.length || 0);

  useEffect(() => {
    if (specification === "- / - / - / - / - / - / -") return;

    getRecommendIntroductions();
  }, [specification]);

  const companyRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  const keywordRef = useRef<HTMLInputElement>(null);

  const search = () => {
    const companyName = companyRef.current?.value;
    const jobName = jobRef.current?.value;
    const keyword = keywordRef.current?.value;
  };

  return (
    <S.Screen title="자기소개서 추천 " description={`자기소개서 추천, ${BRAND_NAME}`}>
      <S.Frame>
        <S.TopForm>
          <S.Title>여러분의 스펙에 맞는 합격 자기소개서 들 중에 원하는 자기소개서를 검색하실 수 있습니다.</S.Title>
          <S.SearchBarFrame>
            <S.SearchInput placeholder="기업명" ref={companyRef} />
            <S.SearchInput placeholder="직무명" ref={jobRef} />
            <S.SearchInput placeholder="키워드" ref={keywordRef} />
            <S.SearchButton onClick={search}>검색</S.SearchButton>
          </S.SearchBarFrame>
        </S.TopForm>
        <S.SearchResultsFrame>
          <S.MetaInfoForResult>
            <S.CompanyNameMeta>기업명</S.CompanyNameMeta>
            <S.JobMeta>직무명</S.JobMeta>
            <S.SpecAndIntroductionMeta>합격스펙/내용</S.SpecAndIntroductionMeta>
          </S.MetaInfoForResult>
        </S.SearchResultsFrame>
        {recommendedIntroductions ? (
          recommendedIntroductions.slice(0, recommendedSelfIntroductionAmount).map((recommendedIntroduction, index) => {
            const spiltedArray = recommendedIntroduction.title.split("/");
            const companyName = spiltedArray[0].replaceAll(" ", "");
            let job = spiltedArray[1].replaceAll(" ", "") || "직무 비공개";

            return (
              <S.ResultContentFrame key={recommendedIntroduction.title + index}>
                <S.CompanyNameMeta>{companyName}</S.CompanyNameMeta>
                <S.JobMeta>{job}</S.JobMeta>
                <S.SpecAndIntroductionMeta>
                  {recommendedIntroduction.spec} <br />{" "}
                  {recommendedIntroduction.body.slice(0, INTRODICTON_MAX_LENGTH) + " ..."}
                </S.SpecAndIntroductionMeta>
              </S.ResultContentFrame>
            );
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
      </S.Frame>
    </S.Screen>
  );
};

export default RecommendSearchIntroductions;
