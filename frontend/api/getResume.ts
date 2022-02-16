import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const getResume = async () => {
  const response = await request.get(`/resume`);

  return response.data as Resume;
};

export default getResume;
