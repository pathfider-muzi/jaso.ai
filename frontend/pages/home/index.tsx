import Home from "@/components/_templates/Home";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage: NextPage = () => {
  const router = useRouter();
  useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  useEffect(() => {
    router.prefetch(ROUTE.EDITOR);
    router.prefetch(ROUTE.SIGN_UP);
    router.prefetch(ROUTE.USER_PROFILE);
    router.prefetch(ROUTE.INTRODUCTION_RECOMMENDATION);
  }, [router]);

  return <Home />;
};

export default HomePage;
