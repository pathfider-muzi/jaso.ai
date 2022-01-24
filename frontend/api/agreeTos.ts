import request from "@/utils/request";

const agreeTos = async () => {
  const response = await request.post("/user/terms", {
    agreeToTerms: true
  });

  const isSuccess = response.data.affected === 1;

  return isSuccess;
};

export default agreeTos;
