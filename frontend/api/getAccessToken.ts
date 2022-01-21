import getKakaoToken from "./getKakaoAccessToken";
import getServerAccessToken from "./getServerAccessToken";

const getAccessToken = async (code: string) => {
  const data: { accessToken: string } = await getKakaoToken(code);
  const { accessToken: serverAccessToken } = await getServerAccessToken(data.accessToken);

  return serverAccessToken;
};

export default getAccessToken;
