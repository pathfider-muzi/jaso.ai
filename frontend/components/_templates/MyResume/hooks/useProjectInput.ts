import { Project } from "@/types/Project";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useProjectTerm } from "./useProjectTermInput";

interface Props {
  projects: Project[];
}

const useProjectInput = ({ projects }: Props) => {
  const [projectNames, setProjectNames] = useState<{
    [key: Project["id"]]: Project["projectName"];
  }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectNames(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectName"] };

      projects.forEach(project => {
        initState[project.id] = project.projectName;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectNames: ChangeEventHandler<HTMLInputElement> = event => {
    setProjectNames(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value };
    });
  };

  const [projectDetails, setProjectDetails] = useState<{
    [key: Project["id"]]: Project["projectDetail"];
  }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectDetails(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectDetail"] };

      projects.forEach(project => {
        initState[project.id] = project.projectDetail;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectDetails: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectDetails(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value };
    });
  };

  const [projectRoles, setProjectRoles] = useState<{
    [key: Project["id"]]: Project["projectRole"];
  }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectRoles(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectRole"] };

      projects.forEach(project => {
        initState[project.id] = project.projectRole;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectRoles: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectRoles(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value.split(", ") };
    });
  };

  const [projectResults, setProjectResults] = useState<{
    [key: Project["id"]]: Project["projectResult"];
  }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectResults(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectResult"] };

      projects.forEach(project => {
        initState[project.id] = project.projectResult;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectResults: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setProjectResults(state => {
      return { ...state, [`${event.target.dataset.projectid}`]: event.target.value.split(", ") };
    });
  };

  const [projectFeelings, setProjectFeelings] = useState<{
    [key: Project["id"]]: Project["projectFeeling"];
  }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectFeelings(() => {
      const initState = {} as { [key: Project["id"]]: Project["projectFeeling"] };

      projects.forEach(project => {
        initState[project.id] = project.projectFeeling;
      });

      return initState;
    });
  }, [projects]);

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
  } = useProjectTerm(projects);

  const [projectTerms, setProjectTerms] = useState<{
    [key: string]: Project["projectTerm"];
  }>(() => {
    const initState = {} as { [key: string]: string };

    projects.forEach(project => {
      initState[project.id] = project.projectTerm;
    });

    return initState;
  });

  useEffect(() => {
    if (projects.length === 0) return;

    setProjectTerms(() => {
      const initState = {} as { [key: string]: string };

      projects.forEach(project => {
        initState[project.id] = project.projectTerm;
      });

      return initState;
    });
  }, [projects]);

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
    projectTerms
  };
};

export default useProjectInput;
