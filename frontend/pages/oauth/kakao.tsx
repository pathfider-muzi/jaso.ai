import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useOAuth from "../../hooks/useOAuth";

const OAuthKakaoPage: NextPage = () => {
  const router = useRouter();
  const code = router.query?.code as string;
  const { user } = useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  const { kakaoAccessTokenError } = useOAuth({ code });

  useEffect(() => {
    if (kakaoAccessTokenError) {
      router.replace(ROUTE.HOME);
    }
  }, [kakaoAccessTokenError, router, user]);

  return <></>;
};

export default OAuthKakaoPage;
