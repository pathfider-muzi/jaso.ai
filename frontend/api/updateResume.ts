import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const updateResume = async (resumeInfo: Pick<Resume, "title" | "name" | "role" | "email" | "contacts">) => {
  const response = await request.patch("/resume", {
    ...resumeInfo
  });

  const data = response.data as {
    affected: boolean;
  };

  const isSuccess = !!data.affected;

  return isSuccess;
};

export default updateResume;
