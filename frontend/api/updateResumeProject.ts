import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import request from "@/utils/request";

interface Props
  extends Pick<
    Project,
    "id" | "projectName" | "projectRole" | "projectDetail" | "projectFeeling" | "projectResult" | "projectTerm"
  > {
  resumeId: Resume["id"];
}

const updateResumeProject = async ({
  id,
  projectName,
  projectRole,
  projectDetail,
  projectFeeling,
  projectResult,
  projectTerm,
  resumeId
}: Props) => {
  const response = await request.patch("/resume-project", {
    id,
    projectName,
    projectRole,
    projectDetail,
    projectFeeling,
    projectResult,
    projectTerm,
    resumeId
  });

  const data = response.data as {
    affected: boolean;
  };

  const isSuccess = !!data.affected;

  return isSuccess;
};

export default updateResumeProject;
