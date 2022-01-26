import Home from "@/components/_templates/Home";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage: NextPage = () => {
  const router = useRouter();
  useUser({ enabled: true });

  useEffect(() => {
    router.prefetch(ROUTE.EDITOR);
    router.prefetch(ROUTE.SIGN_UP);
    router.prefetch(ROUTE.USER_PROFILE);
  }, [router]);

  return <Home />;
};

export default HomePage;
