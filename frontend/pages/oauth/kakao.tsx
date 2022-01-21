import agreeTos from "@/api/agreeTos";
import getAccessToken from "@/api/getAccessToken";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OAuthKakaoPage: NextPage = () => {
  const router = useRouter();
  const code = router.query?.code as string | undefined;
  const { user, getUser } = useUser({});

  useEffect(() => {
    if (!code) return;

    getAccessToken(code).then(accessToken => {
      setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);

      getUser();
    });
  }, [code]);

  useEffect(() => {
    if (!user) return;

    if (user.agreeToTerms) {
      router.replace(ROUTE.EDITOR);
    } else {
      const agreedTos = getLocalStorage(LOCAL_STORAGE_KEY.TOS);
      if (agreedTos) {
        (async () => {
          const { isSuccess } = await agreeTos();
          if (isSuccess) getUser();
        })();
      } else {
        removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        router.replace(ROUTE.SIGN_UP);
      }
    }
  }, [user]);

  return <>Loading...</>;
};

export default OAuthKakaoPage;
