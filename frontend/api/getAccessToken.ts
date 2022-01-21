import { axiosBearerOption } from "@/utils/bearerAxios";
import getKakaoToken from "./getKakaoAccessToken";
import getServerAccessToken from "./getServerAccessToken";

const getAccessToken = async (code: string) => {
  const data: { accessToken: string } = await getKakaoToken(code);
  const { accessToken: serverAccessToken } = await getServerAccessToken(data.accessToken);

  axiosBearerOption.setAccessToken(serverAccessToken);

  return serverAccessToken;
};

export default getAccessToken;
