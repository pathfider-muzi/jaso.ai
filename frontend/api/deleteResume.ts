import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const deleteResume = async (id: Resume["id"]) => {
  const response = await request.delete(`/resume/${id}`);

  const data = response.data as {
    affected: number;
  };

  const isSuccess = !!data.affected;

  return isSuccess;
};

export default deleteResume;
