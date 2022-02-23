import useResumeProjects from "@/hooks/useResumeProjects";
import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useProjectTerm } from "./useProjectTermInput";

interface Props {
  resumeId: Resume["id"];
}

const useProject = ({ resumeId }: Props) => {
  const {
    isFetched,
    isSuccess,
    projects: fetchedProject,
    createResumeProject,
    updateResumeProject,
    deleteResumeProject
  } = useResumeProjects({
    enabled: true,
    resumeId
  });

  const [projectNames, setProjectNames] = useState<{
    [key: Project["id"]]: Project["projectName"];
  }>({});

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectNames(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectName"] };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectName;
      });

      return initState;
    });
  }, [fetchedProject]);

  const onChangeProjectNames: ChangeEventHandler<HTMLInputElement> = event => {
    setProjectNames(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value };
    });
  };

  const [projectDetails, setProjectDetails] = useState<{
    [key: Project["id"]]: Project["projectDetail"];
  }>({});

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectDetails(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectDetail"] };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectDetail;
      });

      return initState;
    });
  }, [fetchedProject]);

  const onChangeProjectDetails: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectDetails(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value };
    });
  };

  const [projectRoles, setProjectRoles] = useState<{
    [key: Project["id"]]: Project["projectRole"];
  }>({});

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectRoles(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectRole"] };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectRole;
      });

      return initState;
    });
  }, [fetchedProject]);

  const onChangeProjectRoles: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectRoles(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value.split(", ") };
    });
  };

  const [projectResults, setProjectResults] = useState<{
    [key: Project["id"]]: Project["projectResult"];
  }>({});

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectResults(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectResult"] };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectResult;
      });

      return initState;
    });
  }, [fetchedProject]);

  const onChangeProjectResults: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectResults(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value.split(", ") };
    });
  };

  const [projectFeelings, setProjectFeelings] = useState<{
    [key: Project["id"]]: Project["projectFeeling"];
  }>({});

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectFeelings(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectFeeling"] };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectFeeling;
      });

      return initState;
    });
  }, [fetchedProject]);

  const onChangeProjectFeelings: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectFeelings(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value.split(", ") };
    });
  };

  const {
    startYears,
    startMonths,
    endYears,
    endMonths,
    onChangeProjectTermStartYears,
    onChangeProjectTermStartMonths,
    onChangeProjectTermEndYears,
    onChangeProjectTermEndMonths,
    stringifyProjectTerm
  } = useProjectTerm(fetchedProject);

  const [projectTerms, setProjectTerms] = useState<{
    [key: string]: Project["projectTerm"];
  }>(() => {
    const initState = {} as { [key: string]: string };

    fetchedProject.forEach(project => {
      initState[project.id] = project.projectTerm;
    });

    return initState;
  });

  useEffect(() => {
    if (fetchedProject.length === 0) return;

    setProjectTerms(() => {
      const initState = {} as { [key: string]: string };

      fetchedProject.forEach(project => {
        initState[project.id] = project.projectTerm;
      });

      return initState;
    });
  }, [fetchedProject]);

  const projects = fetchedProject.reduce((acc, curr) => {
    const projectId = curr.id;

    const newProject: Project = {
      ...curr,
      id: projectId,
      projectName: projectNames[projectId],
      projectDetail: projectDetails[projectId],
      projectTerm: projectTerms[projectId],
      projectRole: projectRoles[projectId],
      projectResult: projectResults[projectId],
      projectFeeling: projectFeelings[projectId]
    };

    acc.push(newProject);

    return acc;
  }, [] as Project[]);

  return {
    projectNames,
    projectDetails,
    projectRoles,
    projectResults,
    projectFeelings,
    onChangeProjectNames,
    onChangeProjectDetails,
    onChangeProjectRoles,
    onChangeProjectResults,
    onChangeProjectFeelings,
    startYears,
    startMonths,
    endYears,
    endMonths,
    onChangeProjectTermStartYears,
    onChangeProjectTermStartMonths,
    onChangeProjectTermEndYears,
    onChangeProjectTermEndMonths,
    projectTerms,
    fetchState: {
      isFetched,
      isSuccess
    },
    mutation: {
      createResumeProject,
      updateResumeProject,
      deleteResumeProject
    },
    projects
  };
};

export default useProject;
