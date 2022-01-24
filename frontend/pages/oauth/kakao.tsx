import ROUTE from "@/constants/routes";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useOAuth from "../../hooks/useOAuth";

const OAuthKakaoPage: NextPage = () => {
  const router = useRouter();
  const code = router.query?.code as string;

  const { kakaoAccessTokenError } = useOAuth({ code });

  useEffect(() => {
    if (kakaoAccessTokenError) {
      router.replace(ROUTE.HOME);
    }
  }, [kakaoAccessTokenError]);

  return <></>;
};

export default OAuthKakaoPage;
