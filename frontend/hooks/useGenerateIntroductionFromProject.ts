import generateIntroductionFromProject from "@/api/generateIntroductionFromProject";
import { Project } from "@/types/Project";
import { useQuery } from "react-query";

interface Props {
  project: Pick<
    Project,
    "id" | "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >;
  enabled?: boolean;
}

const useGenerateIntroductionFromProject = ({ project, enabled = false }: Props) => {
  const { data, isLoading, error, refetch, isFetched, isFetching, isRefetchError } = useQuery<string>(
    [project.id],
    () => generateIntroductionFromProject(project),
    {
      enabled,
      retry: 0
    }
  );

  return {
    isLoading,
    isFetching,
    isFetched,
    isRefetchError,
    error,
    introduction: data,
    refetch
  };
};

export default useGenerateIntroductionFromProject;
