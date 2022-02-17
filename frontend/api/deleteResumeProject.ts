import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import request from "@/utils/request";

interface Props {
  resumeId: Resume["id"];
  projectId: Project["id"];
}

const deleteResumeProject = async ({ resumeId, projectId }: Props) => {
  const response = await request.delete(`/resume-project/${projectId}?resumeId=${resumeId}`);

  const data = response.data as {
    affected: number;
  };

  const isSuccess = !!data.affected;

  return isSuccess;
};

export default deleteResumeProject;
