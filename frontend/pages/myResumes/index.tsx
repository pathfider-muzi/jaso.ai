import MyResumes from "@/components/_templates/MyResumes";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyResumesPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser({ enabled: false });

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  return <MyResumes />;
};

export default MyResumesPage;
