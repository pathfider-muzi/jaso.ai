import getRecommendIntroductions from "@/api/getRecommendIntroductions";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import { useQuery } from "react-query";

const RECOMMENDED_SELF_INTRODUCTION_AMOUNT = 50;

interface Props {
  enabled?: boolean;
  specification: string;
}

const useSelfIntroductionRecommend = ({ enabled = true, specification }: Props) => {
  const { data, isLoading, isFetched, error, refetch } = useQuery<RecommendedIntroductionType[]>(
    ["recommendIntroductions"],
    () => getRecommendIntroductions({ amount: RECOMMENDED_SELF_INTRODUCTION_AMOUNT, specification }),
    { enabled }
  );

  return {
    recommendedIntroductions: data,
    isLoading,
    isFetched,
    error,
    getRecommendIntroductions: refetch
  };
};

export default useSelfIntroductionRecommend;
