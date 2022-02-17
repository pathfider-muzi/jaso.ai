import generateIntroductionFromProject from "@/api/generateIntroductionFromProject";
import { Project } from "@/types/Project";
import { useQuery } from "react-query";

interface Props {
  project: Pick<
    Project,
    "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >;
  enabled?: boolean;
}

const useGenerateIntroductionFromProject = ({ project, enabled = false }: Props) => {
  const { data, isLoading, error, refetch } = useQuery<string>(
    Object.values(project),
    () => generateIntroductionFromProject(project),
    {
      enabled
    }
  );

  return {
    isLoading,
    error,
    introduction: data,
    refetch
  };
};

export default useGenerateIntroductionFromProject;
