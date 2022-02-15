import getIsFilledAdditionalInfo from "@/api/getIsFilledAddtionalInfo";
import Editor from "@/components/_templates/Editor";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";

const SelfIntroductionPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser({ enabled: false });

  useQuery(["isFilledAdditionalInfo"], getIsFilledAdditionalInfo, {
    enabled: true,
    onSettled: isFilledAdditionalInfo => {
      if (!isFilledAdditionalInfo) {
        alert("에디터를 사용하기 위해서는 추가정보를 입력해야합니다.\n회원정보 페이지로 이동합니다.");

        router.push(ROUTE.USER_PROFILE);
      }
    }
  });

  const selfIntroductionId = Number(router.query.id as string);
  const { selfIntroductions, isFetched: isSelfIntroductionsFetched } = useSelfIntroductions({ enabled: true });

  const selfIntroduction = selfIntroductions.find(_selfIntroduction => _selfIntroduction.id === selfIntroductionId);

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
  }, [router, user]);

  useEffect(() => {
    if (!isSelfIntroductionsFetched) return;

    if (!selfIntroduction) router.push(ROUTE.MY_SELFINTRODUCTIONS);
  }, [selfIntroduction, isSelfIntroductionsFetched, router]);

  if (!selfIntroduction) return <></>;
  return <Editor selfIntroduction={selfIntroduction} />;
};

export default SelfIntroductionPage;
