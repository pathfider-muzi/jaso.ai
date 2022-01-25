import getRecommendIntroductions from "@/api/getRecommendIntroductions";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import { useQuery } from "react-query";

interface Props {
  enabled?: boolean;
}

const useSelfIntroductionRecommend = ({ enabled = true }: Props) => {
  const { data, isLoading, isFetched, error, refetch } = useQuery<RecommendedIntroductionType[]>(
    ["recommendIntroductions"],
    getRecommendIntroductions,
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
