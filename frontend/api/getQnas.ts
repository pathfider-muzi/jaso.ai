import { Qna } from "@/types/Qna";
import request from "@/utils/request";

const getQnas = async (selfIntroductionId: number) => {
  const response = await request.get(`/qnas?selfIntroductionId=${selfIntroductionId}`);

  return response.data as Qna[];
};

export default getQnas;
