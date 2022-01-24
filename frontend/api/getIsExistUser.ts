import request from "@/utils/request";

export interface GetIsExistUserResponse {
  hasAlreadySignedUp: boolean;
}

const getIsExistUser = async (accessToken: string) => {
  const response = await request.post("/auth/signup-inquiry", {
    accessToken
  });
  const { hasAlreadySignedUp } = response.data as GetIsExistUserResponse;

  return hasAlreadySignedUp;
};

export default getIsExistUser;
