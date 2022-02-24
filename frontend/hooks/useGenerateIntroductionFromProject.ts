import generateIntroductionFromProject from "@/api/generateIntroductionFromProject";
import getProjectGeneratedResult from "@/api/getProjectGeneratedResult";
import { Project } from "@/types/Project";
import { useQuery } from "react-query";

interface Props {
  project: Pick<
    Project,
    "id" | "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >;
  enabled?: boolean;
  doRefetch: boolean;
  resumeProjectId: Project["id"] | string;
}

const useGenerateIntroductionFromProject = ({ project, enabled = false, doRefetch, resumeProjectId }: Props) => {
  const {
    data: generationResponseData,
    refetch: refetchGenerateIntroduction,
    error
  } = useQuery<
    {
      resumeMotivationId: string;
      queueNum: number;
    },
    { error: string }
  >(
    ["generateIntroductionFromProject", resumeProjectId],
    () => generateIntroductionFromProject(project, resumeProjectId),
    {
      enabled,
      retry: 0
    }
  );

  const { data: resultData, refetch: refetchGetProjectGeneratedResult } = useQuery<
    { projectIntroduction: string; requested: boolean; generated: boolean },
    { error: string }
  >(["getProjectGeneratedResult", resumeProjectId], () => getProjectGeneratedResult(resumeProjectId), {
    enabled: doRefetch,
    refetchInterval: 10 * 1000,
    refetchIntervalInBackground: true
  });

  return {
    delayCount: generationResponseData?.queueNum,
    projectIntroduction: resultData?.projectIntroduction,
    generationResponseData,
    refetchGenerateIntroduction,
    refetchGetProjectGeneratedResult
  };
};

export default useGenerateIntroductionFromProject;
