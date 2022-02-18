import UserProfile from "@/components/_templates/UserProfile";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  return <UserProfile />;
};

export default UserProfilePage;
