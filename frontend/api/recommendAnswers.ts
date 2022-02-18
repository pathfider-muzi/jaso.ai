import { InfoForRecommendAnswer } from "@/types/recommendAnswer";
import request from "@/utils/request";

const getRecommendAnswers = async ({ listNum, question, specification }: InfoForRecommendAnswer) => {
  console.log(specification);
  const response = await request.post(`/recommendation/answer`, {
    listNum,
    question,
    specification
  });

  const data = response.data.data.recommendationList as {
    body: string;
    rank: number;
    spec: string;
  }[];

  return data;
};

export default getRecommendAnswers;
