import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

const deleteSelfIntroduction = async (selfIntroductionId: SelfIntroduction["id"]) => {
  const response = await request.delete(`/self-introduction/${selfIntroductionId}`);

  const data = response.data as {
    affected: number;
  };

  const isSuccess = data.affected;

  return isSuccess;
};

export default deleteSelfIntroduction;
