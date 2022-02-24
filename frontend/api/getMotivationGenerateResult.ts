import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const getMotivationGeneratedResult = async (resumeMotivationId: Resume["id"] | string) => {
  const response = await request.get(`/generation/motivation/result?resumeMotivationId=${resumeMotivationId}`);

  const data = response.data as { data: { motiveIntroduction: string }; requested: boolean; generated: boolean };

  return {
    motiveIntroduction: data.data.motiveIntroduction,
    requested: data.requested,
    generated: data.generated
  };
};

export default getMotivationGeneratedResult;
