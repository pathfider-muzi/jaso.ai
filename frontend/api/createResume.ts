import { Resume } from "@/types/Resume";
import request from "@/utils/request";

const createResume = async (
  resumeInfo: Pick<
    Resume,
    "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >
) => {
  const response = await request.post(`/resume`, {
    ...resumeInfo
  });

  const isSuccess = !!(response.data.raw.affectedRows as number);

  return isSuccess;
};

export default createResume;
