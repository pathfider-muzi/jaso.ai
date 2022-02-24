import { Motivation } from "@/types/Motivation";
import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const generateMotivation = async (motivationInfo: Motivation, resumeMotivationId: Resume["id"] | string) => {
  const query = `/generation/motivation/async`;
  const response = await request.post(query, {
    resumeMotivationId,
    ...motivationInfo
  });

  const { data } = response.data as { data: { resumeMotivationId: string; queueNum: number } };

  return {
    resumeMotivationId: data.resumeMotivationId,
    queueNum: data.queueNum
  };
};

export default generateMotivation;
