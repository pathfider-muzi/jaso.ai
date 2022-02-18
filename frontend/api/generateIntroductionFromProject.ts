import { Project } from "@/types/Project";
import request from "@/utils/request";

const generateIntroductionFromProject = async (
  project: Pick<
    Project,
    "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >
) => {
  const response = await request.post(`/generation/project`, {
    ...project
  });

  const data = response.data as { data: { projectIntroduction: string } };

  return data.data.projectIntroduction;
};

export default generateIntroductionFromProject;
