import getIsFilledAdditionalInfo from "@/api/getIsFilledAddtionalInfo";
import Editor from "@/components/_templates/Editor";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { getLocalStorage } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";

const SelfIntroductionPage: NextPage = () => {
  const router = useRouter();

  const { data: isFilledAdditionalInfo, isFetched: isFilledAdditionalInfoFetched } = useQuery(
    [""],
    getIsFilledAdditionalInfo,
    {}
  );
  const selfIntroductionId = Number(router.query.id as string);
  const { selfIntroductions, isFetched: isSelfIntroductionsFetched } = useSelfIntroductions({ enabled: true });

  const selfIntroduction = selfIntroductions.find(_selfIntroduction => _selfIntroduction.id === selfIntroductionId);

  useEffect(() => {
    if (!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.replace(ROUTE.HOME);
    if (!isFilledAdditionalInfoFetched) return;
    if (!isFilledAdditionalInfo) {
      alert("에디터를 사용하기 위해서는 추가정보를 입력해야합니다.\n회원정보 페이지로 이동합니다.");

      router.push({ pathname: ROUTE.USER_PROFILE, query: { isFilledAdditionalInfo: "false" } });
    }
  }, [isFilledAdditionalInfo, isFilledAdditionalInfoFetched]);

  useEffect(() => {
    if (!isSelfIntroductionsFetched) return;

    if (!selfIntroduction) router.push(ROUTE.MY_RESUMES);
  }, [selfIntroduction, isSelfIntroductionsFetched]);

  if (!selfIntroduction) return <></>;
  return <Editor selfIntroduction={selfIntroduction} />;
};

export default SelfIntroductionPage;
