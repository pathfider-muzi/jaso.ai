import { Project } from "@/types/Project";
import request from "@/utils/request";

const getResumeProjects = async (resumeId: number) => {
  const response = await request.get(`/resume-projects?resumeId=${resumeId}`);

  return response.data as Project[];
};

export default getResumeProjects;
