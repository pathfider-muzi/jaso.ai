import Resume from "@/components/_templates/Resume";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useResumes from "@/hooks/useResumes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ResumePage: NextPage = () => {
  const router = useRouter();

  const { user } = useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  const { resumes } = useResumes({
    enabled: true
  });

  const resume = resumes[0];

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  if (!resume) return <></>;
  return <Resume resume={resume} />;
};

export default ResumePage;
