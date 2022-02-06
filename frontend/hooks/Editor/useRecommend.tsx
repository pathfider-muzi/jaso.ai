import getRecommendIntroductions from "@/api/editor/getRecommendIntroductions";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  enabled?: boolean;
}

const useRecommend = () => {
  const [recommendedIntroductions, setRecommendedIntroductions] = useState<RecommendedIntroductionType[]>([]);

  const RECOMMENDED_INTRODUCTIONS_KEY = "recommendedIntroductions";

  useEffect(() => {
    async function executeApi() {
      await callApiAndSave();
    }

    if (getLocalStorage(RECOMMENDED_INTRODUCTIONS_KEY) === undefined) {
      executeApi();
    } else {
      setRecommendedIntroductions(getLocalStorage(RECOMMENDED_INTRODUCTIONS_KEY));
    }
  }, []);

  const callApiAndSave = async () => {
    let introductions = await getRecommendIntroductions();
    setLocalStorage(RECOMMENDED_INTRODUCTIONS_KEY, introductions);
    setRecommendedIntroductions(introductions);
  };

  return {
    recommendedIntroductions
  };
};

export default useRecommend;
