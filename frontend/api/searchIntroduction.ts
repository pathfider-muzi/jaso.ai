import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import SearchMetaInfo from "@/types/searchIntroductions";
import request from "@/utils/request";

const searchIntroductions = async (searchMetaInfo: SearchMetaInfo) => {
  const response = await request.post(`/recommendation/search`, searchMetaInfo);
  const data = response.data.data.res as RecommendedIntroductionType[];

  return data;
};

export default searchIntroductions;
