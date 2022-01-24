import request from "@/utils/request";

// TODO: 동작안하는중
const getSelfIntroduction = async (selfIntroductionId: number) => {
  const response = await request.get(`/self-introduction/${selfIntroductionId}`);

  return response.data;
};

export default getSelfIntroduction;
