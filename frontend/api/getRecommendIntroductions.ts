import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import request from "@/utils/request";

const getRecommendIntroductions = async (amount: number) => {
  const response = await request.get(`/recommendation/full-text/?listNum=${amount}`);

  return response.data.data.recommendationList as RecommendedIntroductionType[];
};

export default getRecommendIntroductions;
