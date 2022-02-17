import { TERM_INPUT_VALIDATION } from "@/constants/validation";
import { Project } from "@/types/Project";
import { ChangeEventHandler, useEffect, useState } from "react";

const parseProjectTerm = (projectTerm: Project["projectTerm"]) => {
  const [startDate, endDate] = projectTerm.split("-");

  const [startYear, startMonth] = startDate.split(".");
  const [endYear, endMonth] = endDate.split(".");

  return {
    startYear,
    startMonth,
    endYear,
    endMonth
  };
};

const stringifyProjectTerm = ({
  startYear,
  startMonth,
  endYear,
  endMonth
}: {
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
}) => {
  return `${startYear}.${startMonth}-${endYear}.${endMonth}`;
};

const isValidYear = (year: string) => {
  const isValidLength = year.length <= TERM_INPUT_VALIDATION.MAX_LENGTH.YEAR;

  return isValidLength;
};

const isValidMonth = (month: string) => {
  const isValidLength = month.length <= TERM_INPUT_VALIDATION.MAX_LENGTH.MONTH;

  return isValidLength;
};

export const useProjectTerm = (projects: Project[]) => {
  const [startYears, setStartYears] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setStartYears(() => {
      const initState = {} as { [key: string]: string };

      projects.forEach(project => {
        const { startYear } = parseProjectTerm(project.projectTerm);

        initState[project.id] = startYear;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectTermStartYears: ChangeEventHandler<HTMLInputElement> = event => {
    const year = event.target.value;

    if (!isValidYear(year)) return;

    setStartYears(state => {
      return {
        ...state,
        [`${event.target.dataset.projectid}`]: year
      };
    });
  };

  const [startMonths, setStartMonths] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setStartMonths(() => {
      const initState = {} as { [key: string]: string };

      projects.forEach(project => {
        const { startMonth } = parseProjectTerm(project.projectTerm);

        initState[project.id] = startMonth;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectTermStartMonths: ChangeEventHandler<HTMLInputElement> = event => {
    const month = event.target.value;

    if (!isValidMonth(month)) return;

    setStartMonths(state => {
      return {
        ...state,
        [`${event.target.dataset.projectid}`]: month
      };
    });
  };

  const [endYears, setEndYears] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setEndYears(() => {
      const initState = {} as { [key: string]: string };

      projects.forEach(project => {
        const { endYear } = parseProjectTerm(project.projectTerm);

        initState[project.id] = endYear;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectTermEndYears: ChangeEventHandler<HTMLInputElement> = event => {
    const year = event.target.value;

    if (!isValidYear(year)) return;

    setEndYears(state => {
      return {
        ...state,
        [`${event.target.dataset.projectid}`]: year
      };
    });
  };

  const [endMonths, setEndMonths] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (projects.length === 0) return;

    setEndMonths(() => {
      const initState = {} as { [key: string]: string };

      projects.forEach(project => {
        const { endMonth } = parseProjectTerm(project.projectTerm);

        initState[project.id] = endMonth;
      });

      return initState;
    });
  }, [projects]);

  const onChangeProjectTermEndMonths: ChangeEventHandler<HTMLInputElement> = event => {
    const month = event.target.value;

    if (!isValidMonth(month)) return;

    setEndMonths(state => {
      return {
        ...state,
        [`${event.target.dataset.projectid}`]: month
      };
    });
  };

  return {
    startYears,
    onChangeProjectTermStartYears,
    startMonths,
    onChangeProjectTermStartMonths,
    endYears,
    onChangeProjectTermEndYears,
    endMonths,
    onChangeProjectTermEndMonths,
    stringifyProjectTerm
  };
};
