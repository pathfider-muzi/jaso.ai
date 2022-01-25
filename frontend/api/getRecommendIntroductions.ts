import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import request from "@/utils/request";

const getRecommendIntroductions = async () => {
  const response = await request.get(`/recommendation/full-text/?listNum=${3}`);

  return response.data.data.recommendationList as RecommendedIntroductionType[];
};

export default getRecommendIntroductions;
