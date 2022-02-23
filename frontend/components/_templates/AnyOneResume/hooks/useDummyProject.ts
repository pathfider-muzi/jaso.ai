import { useProjectTerm } from "@/hooks/useProjectTermInput";
import { Project } from "@/types/Project";
import { ChangeEventHandler, useState } from "react";

interface Props {
  projects: Project[];
}

const useDummyProject = ({ projects: fetchedProject }: Props) => {
  const [projectNames, setProjectNames] = useState<{
    [key: Project["id"]]: Project["projectName"];
  }>({});

  const onChangeProjectNames: ChangeEventHandler<HTMLInputElement> = event => {};

  const [projectDetails, setProjectDetails] = useState<{
    [key: Project["id"]]: Project["projectDetail"];
  }>({});

  const onChangeProjectDetails: ChangeEventHandler<HTMLTextAreaElement> = event => {};

  const [projectRoles, setProjectRoles] = useState<{
    [key: Project["id"]]: Project["projectRole"];
  }>({});

  const onChangeProjectRoles: ChangeEventHandler<HTMLTextAreaElement> = event => {};

  const [projectResults, setProjectResults] = useState<{
    [key: Project["id"]]: Project["projectResult"];
  }>({});

  const onChangeProjectResults: ChangeEventHandler<HTMLTextAreaElement> = event => {};

  const [projectFeelings, setProjectFeelings] = useState<{
    [key: Project["id"]]: Project["projectFeeling"];
  }>({});

  const onChangeProjectFeelings: ChangeEventHandler<HTMLTextAreaElement> = event => {};

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
    projects,
    fetchState: {
      isFetched: true,
      isSuccess: true
    }
  };
};

export default useDummyProject;
