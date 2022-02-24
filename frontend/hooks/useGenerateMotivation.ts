import generateMotivation from "@/api/generateMotivation";
import getMotivationGeneratedResult from "@/api/getMotivationGenerateResult";
import { Motivation } from "@/types/Motivation";
import { Resume } from "@/types/Resume";
import { useQuery } from "react-query";

interface Props {
  motivationInfo: Motivation;
  resumeMotivationId: Resume["id"] | string;
  enabled?: boolean;
  doRefetch: boolean;
}

const useGenerateMotivation = ({ motivationInfo, resumeMotivationId, enabled = false, doRefetch }: Props) => {
  const { data: generationResponseData, refetch: refetchGenerateIntroduction } = useQuery<{
    resumeMotivationId: string;
    queueNum: number;
  }>(motivationInfo.orgName, () => generateMotivation(motivationInfo, resumeMotivationId), {
    enabled,
    retry: 0
  });

  const { data: resultData, refetch: refetchGetMotivationGeneratedResult } = useQuery<
    { motiveIntroduction: string; requested: boolean; generated: boolean },
    { error: string }
  >(["getMotivationGeneratedResult", resumeMotivationId], () => getMotivationGeneratedResult(resumeMotivationId), {
    enabled: doRefetch,
    refetchInterval: 10 * 1000,
    refetchIntervalInBackground: true
  });

  return {
    delayCount: generationResponseData?.queueNum,
    motivationIntroduction: resultData?.motiveIntroduction,
    generationResponseData,
    refetchGenerateIntroduction,
    refetchGetMotivationGeneratedResult
  };
};

export default useGenerateMotivation;
