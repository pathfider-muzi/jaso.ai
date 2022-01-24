import DOMAIN from "@/constants/domain";
import axios from "axios";

export interface GetKakaoTokenResponse {
  access_token: string;
}

const getKakaoToken = async (code: string) => {
  const response = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&code=${code}&redirect_uri=${DOMAIN}/oauth/kakao`,
    {},
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }
  );

  const { access_token } = response.data as GetKakaoTokenResponse;

  return access_token;
};

export default getKakaoToken;
