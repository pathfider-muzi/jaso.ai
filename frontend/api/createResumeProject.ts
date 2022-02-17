import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import request from "@/utils/request";

interface Props {
  resumeId: Resume["id"];
  project: Pick<
    Project,
    "projectName" | "projectDetail" | "projectFeeling" | "projectResult" | "projectRole" | "projectTerm"
  >;
}

const createResumeProject = async ({ resumeId, project }: Props) => {
  const response = await request.post(`/resume-project`, {
    ...project,
    resumeId
  });

  const isSuccess = !!(response.data.raw.affectedRows as number);

  return isSuccess;
};

export default createResumeProject;
