import { Motivation } from "@/types/Motivation";
import request from "@/utils/request";

const generateMotivation = async (motivationInfo: Motivation, isLogined: boolean) => {
  const query = isLogined ? `/generation/motivation` : `/generation/motivation/guest`;
  const response = await request.post(query, {
    ...motivationInfo
  });

  const data = response.data as { data: { motiveIntroduction: string } };

  return data.data.motiveIntroduction;
};

export default generateMotivation;
