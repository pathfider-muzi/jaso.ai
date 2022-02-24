import { Project } from "@/types/Project";
import request from "@/utils/request";

const generateIntroductionFromProject = async (
  project: Pick<
    Project,
    "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >,
  resumeProjectId: Project["id"] | string
) => {
  const response = await request.post(`/generation/project/async`, {
    resumeProjectId,
    ...project
  });

  const { data } = response.data as { data: { resumeProjectId: string; queueNum: number } };

  return {
    resumeMotivationId: data.resumeProjectId,
    queueNum: data.queueNum
  };
};

export default generateIntroductionFromProject;
