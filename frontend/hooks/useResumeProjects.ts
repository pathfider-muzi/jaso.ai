import _createResumeProject from "@/api/createResumeProject";
import _deleteResumeProject from "@/api/deleteResumeProject";
import getResumeProjects from "@/api/getResumeProjects";
import _updateResumeProject from "@/api/updateResumeProject";
import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import { useMutation, useQuery } from "react-query";

interface Props {
  enabled: boolean;
  resumeId: Resume["id"];
}

const useResumeProjects = ({ enabled, resumeId }: Props) => {
  const {
    data: projects,
    isLoading,
    error,
    isFetched,
    isSuccess,
    refetch: refetchResumeProjects
  } = useQuery<Project[]>(["resumeId"], () => getResumeProjects(resumeId), {
    enabled
  });

  const { mutate: createResumeProject } = useMutation(_createResumeProject, {
    onSuccess: () => {
      refetchResumeProjects();
    }
  });

  const { mutate: updateResumeProject } = useMutation(_updateResumeProject, {
    onSuccess: () => {
      refetchResumeProjects();
    }
  });

  const { mutate: deleteResumeProject } = useMutation(_deleteResumeProject, {
    onSuccess: () => {
      refetchResumeProjects();
    }
  });

  return {
    projects: projects || [],
    refetchResumeProjects,
    isLoading,
    error,
    isFetched,
    isSuccess,
    createResumeProject,
    deleteResumeProject,
    updateResumeProject
  };
};

export default useResumeProjects;
