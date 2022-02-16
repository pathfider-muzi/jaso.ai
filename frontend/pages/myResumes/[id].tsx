import { NextPage } from "next";
import { useRouter } from "next/router";

const MyResumePage: NextPage = () => {
  const router = useRouter();
  const resumeId = Number(router.query.id as string);

  return <></>;
};

export default MyResumePage;
