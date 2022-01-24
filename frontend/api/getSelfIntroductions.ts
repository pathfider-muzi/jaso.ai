import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

const getSelfIntroductions = async () => {
  const response = await request.get("/self-introductions");

  return response.data as SelfIntroduction[];
};

export default getSelfIntroductions;
