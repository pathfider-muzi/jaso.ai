import { Project } from "@/types/Project";
import request from "@/utils/request";

const getProjectGeneratedResult = async (resumeProjectId: Project["id"] | string) => {
  const response = await request.get(`/generation/project/result?resumeProjectId=${resumeProjectId}`);

  const data = response.data as { data: { projectIntroduction: string }; requested: boolean; generated: boolean };

  return {
    projectIntroduction: data.data.projectIntroduction,
    requested: data.requested,
    generated: data.generated
  };
};

export default getProjectGeneratedResult;
