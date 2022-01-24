import request from "@/utils/request";

const getServerAccessToken = async (kakaoAccessToken: string) => {
  const response = await request.post("/auth/kakao-token", {
    accessToken: kakaoAccessToken
  });

  const data = response.data.jwt as { accessToken: string };

  return data.accessToken;
};

export default getServerAccessToken;
