import AdditionalInfoAlertModal from "@/components/_common/AdditionalInfoAlertModal";
import BRAND_NAME from "@/constants/brandName";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import usePleaseFillAdditionalModal from "@/hooks/usePleaseFillAdditionalInfoModal";
import useSelfIntroductionRecommend from "@/hooks/useSelfIntroductionRecommend";
import useUser, { getUserInfoString } from "@/hooks/useUser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import SearchMetaInfo from "@/types/searchIntroductions";
import searchIntroductions from "@/api/searchIntroduction";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import IntroductionDetailModal from "@/components/Introduction/IntroductionDetailModal";
import useModal from "@/hooks/useModal";
import getRecommendIntroductions from "@/api/getRecommendIntroductions";

const SELF_INTRODUCTION_AMOUNT_UNIT = 6;
const INTRODICTON_MAX_LENGTH = 50;

const RecommendSearchIntroductions = () => {
  const [recommendedSelfIntroductionAmount, setRecommendedSelfIntroductionAmount] =
    useState(SELF_INTRODUCTION_AMOUNT_UNIT);

  const { isPleaseFillAdditionalModalOpen, closePleaseFillAdditionalModal } = usePleaseFillAdditionalModal();

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

  // let { getRecommendIntroductions, recommendedIntroductions } = useSelfIntroductionRecommend({
  //   enabled: false,
  //   specification
  // });

  const [recommendedIntroductions, setRecommendedIntroductions] = useState<RecommendedIntroductionType[]>([]);

  const getRecommendedIntroductions = async () => {
    const newRecommendedIntroductions = await getRecommendIntroductions({ amount: 100, specification: specification });
    setRecommendedIntroductions(newRecommendedIntroductions);
  };

  const onClickShowMoreRecommendedSelfIntroductionButton = () => {
    if (!canShowMoreRecommendedSelfIntroductions) return;

    setRecommendedSelfIntroductionAmount(state => {
      return state + SELF_INTRODUCTION_AMOUNT_UNIT;
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const [searchedIntroductions, setSearchedIntroductions] = useState<RecommendedIntroductionType[]>([]);

  const canShowMoreRecommendedSelfIntroductions =
    recommendedSelfIntroductionAmount + SELF_INTRODUCTION_AMOUNT_UNIT <=
    (isSearched ? searchedIntroductions?.length : recommendedIntroductions?.length || 0);

  const orgNameRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  const keywordRef = useRef<HTMLInputElement>(null);

  let searchMetaInfo: SearchMetaInfo;

  searchMetaInfo = {
    orgName: "",
    role: "",
    keyword: "",
    specification: specification
  };

  const search = async (event: any) => {
    event.preventDefault();

    const companyName = orgNameRef.current?.value;
    const jobName = jobRef.current?.value;
    const keyword = keywordRef.current?.value;

    searchMetaInfo = {
      ...searchMetaInfo,
      orgName: companyName!,
      role: jobName!,
      keyword: keyword!
    };
    setIsLoading(true);
    setIsSearched(true);
    setRecommendedSelfIntroductionAmount(SELF_INTRODUCTION_AMOUNT_UNIT);
    const searchedRecommendedIntroductions = await searchIntroductions(searchMetaInfo);
    setIsLoading(false);
    setSearchedIntroductions([...searchedRecommendedIntroductions]);
  };

  const { isModalOpen, closeModal, openModal } = useModal({
    defaultValue: false
  });

  const [introductionContent, setIntroductionContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    getRecommendedIntroductions();
  }, [specification, getRecommendIntroductions]);

  return (
    <S.Screen title="자기소개서 추천 " description={`자기소개서 추천, ${BRAND_NAME}`}>
      <S.Frame>
        <S.TopForm>
          <S.Title>여러분의 스펙에 맞는 합격 자기소개서들 중에 원하는 자기소개서를 검색하실 수 있습니다.</S.Title>
          <S.DetailExplanation>* 여러분의 스펙과 관련도가 높은 순으로 자기소개서가 추천됩니다.</S.DetailExplanation>
          <S.SearchBarFrame>
            <S.SearchInput placeholder="기업명" ref={orgNameRef} />
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
        {!isLoading && recommendedIntroductions ? (
          isSearched ? (
            searchedIntroductions === undefined || searchedIntroductions.length === 0 ? (
              <S.NoSearchResult>검색결과가 없습니다</S.NoSearchResult>
            ) : (
              searchedIntroductions!.slice(0, recommendedSelfIntroductionAmount).map((searchedIntroduction, index) => {
                const spiltedArray = searchedIntroduction.title.split("/");

                const companyName = spiltedArray[0]
                  ? spiltedArray[0].replaceAll(" ", "").length === 0
                    ? "회사 비공개"
                    : spiltedArray[0].replaceAll(" ", "")
                  : "회사 비공개";

                const job = spiltedArray[1]
                  ? spiltedArray[1].replaceAll(" ", "").length === 0
                    ? "직무 비공개"
                    : spiltedArray[1].replaceAll(" ", "")
                  : "직무 비공개";

                return (
                  <S.ResultContentFrame
                    key={searchedIntroduction.title + index}
                    onClick={() => {
                      setIntroductionContent(searchedIntroduction.body);
                      setTags(searchedIntroduction.tags);
                      openModal();
                    }}
                  >
                    <S.CompanyNameMeta>{companyName}</S.CompanyNameMeta>
                    <S.JobMeta>{job}</S.JobMeta>
                    <S.SpecAndIntroductionMeta>
                      {searchedIntroduction.spec} <br />{" "}
                      {searchedIntroduction.body.slice(0, INTRODICTON_MAX_LENGTH) + " ..."}
                    </S.SpecAndIntroductionMeta>
                  </S.ResultContentFrame>
                );
              })
            )
          ) : (
            recommendedIntroductions
              .slice(0, recommendedSelfIntroductionAmount)
              .map((recommendedIntroduction, index) => {
                const spiltedArray = recommendedIntroduction.title.split("/");

                const companyName = spiltedArray[0]
                  ? spiltedArray[0].replaceAll(" ", "").length === 0
                    ? "회사 비공개"
                    : spiltedArray[0].replaceAll(" ", "")
                  : "회사 비공개";

                const job = spiltedArray[1]
                  ? spiltedArray[1].replaceAll(" ", "").length === 0
                    ? "직무 비공개"
                    : spiltedArray[1].replaceAll(" ", "")
                  : "직무 비공개";

                return (
                  <S.ResultContentFrame
                    key={recommendedIntroduction.title + index}
                    onClick={() => {
                      setIntroductionContent(recommendedIntroduction.body);
                      setTags(recommendedIntroduction.tags);
                      setId(recommendedIntroduction.id);
                      openModal();
                    }}
                  >
                    <S.CompanyNameMeta>{companyName}</S.CompanyNameMeta>
                    <S.JobMeta>{job}</S.JobMeta>
                    <S.SpecAndIntroductionMeta>
                      {recommendedIntroduction.spec} <br />{" "}
                      {recommendedIntroduction.body.slice(0, INTRODICTON_MAX_LENGTH) + " ..."}
                    </S.SpecAndIntroductionMeta>
                  </S.ResultContentFrame>
                );
              })
          )
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
      <IntroductionDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        introductionContent={introductionContent}
        tags={tags}
        id={id}
      ></IntroductionDetailModal>
      <AdditionalInfoAlertModal isOpen={isPleaseFillAdditionalModalOpen} onClose={closePleaseFillAdditionalModal} />
    </S.Screen>
  );
};

export default RecommendSearchIntroductions;
