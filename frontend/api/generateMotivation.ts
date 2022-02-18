import { Motivation } from "@/types/Motivation";
import request from "@/utils/request";

const generateMotivation = async (motivationInfo: Motivation) => {
  const response = await request.post(`/generation/motivation`, {
    ...motivationInfo
  });

  const data = response.data as { data: { motiveIntroduction: string } };

  return data.data.motiveIntroduction;
};

export default generateMotivation;
