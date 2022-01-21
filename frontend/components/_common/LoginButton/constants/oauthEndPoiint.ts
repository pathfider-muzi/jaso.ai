import DOMAIN from "@/constants/domain";

const OAUTH_END_POINT = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${DOMAIN}/oauth/kakao`
} as const;

export default OAUTH_END_POINT;
