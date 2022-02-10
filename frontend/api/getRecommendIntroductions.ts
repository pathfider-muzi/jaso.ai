import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import request from "@/utils/request";

interface Props {
  amount: number;
  specification: string;
}

const getRecommendIntroductions = async ({ amount, specification }: Props) => {
  const response = await request.post(`/recommendation/full-text`, {
    listNum: amount,
    specification
  });

  return response.data.data.recommendationList as RecommendedIntroductionType[];
};

export default getRecommendIntroductions;
