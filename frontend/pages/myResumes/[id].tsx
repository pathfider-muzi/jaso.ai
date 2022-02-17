import MyResume from "@/components/_templates/MyResume";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useResumes from "@/hooks/useResumes";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyResumePage: NextPage = () => {
  const router = useRouter();
  const resumeId = Number(router.query.id as string);

  const { user } = useUser({ enabled: false });

  const { resumes } = useResumes({
    enabled: true
  });

  const resume = resumes.find(resume => resume.id === resumeId);

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  if (!resume) return <></>;
  return <MyResume resume={resume}></MyResume>;
};

export default MyResumePage;
