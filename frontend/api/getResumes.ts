import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const getResumes = async () => {
  const response = await request.get(`/resumes`);

  return response.data as Resume[];
};

export default getResumes;
