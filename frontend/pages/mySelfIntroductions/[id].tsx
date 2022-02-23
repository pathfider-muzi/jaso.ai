import AdditionalInfoAlertModal from "@/components/_common/AdditionalInfoAlertModal";
import Editor from "@/components/_templates/Editor";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import usePleaseFillAdditionalModal from "@/hooks/usePleaseFillAdditionalInfoModal";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SelfIntroductionPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  const { isPleaseFillAdditionalModalOpen, closePleaseFillAdditionalModal } = usePleaseFillAdditionalModal();

  const selfIntroductionId = Number(router.query.id as string);
  const { selfIntroductions, isFetched: isSelfIntroductionsFetched } = useSelfIntroductions({ enabled: true });

  const selfIntroduction = selfIntroductions.find(_selfIntroduction => _selfIntroduction.id === selfIntroductionId);

  const [isAlertOpened, setOpened] = useState(false);

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  useEffect(() => {
    if (!isSelfIntroductionsFetched) return;

    if (!selfIntroduction) router.push(ROUTE.MY_SELFINTRODUCTIONS);
  }, [selfIntroduction, isSelfIntroductionsFetched, router]);

  if (!selfIntroduction) return <></>;
  return (
    <>
      <Editor selfIntroduction={selfIntroduction} />;
      <AdditionalInfoAlertModal isOpen={isPleaseFillAdditionalModalOpen} onClose={closePleaseFillAdditionalModal} />
    </>
  );
};

export default SelfIntroductionPage;
