import useInput from "@/hooks/useInput";
import { Project } from "@/types/Project";
import { ChangeEventHandler } from "react";

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

const isValidYear = (year: string) => {
  const isValidLength = year.length <= 4;

  return isValidLength;
};

const isValidMonth = (month: string) => {
  const isValidLength = month.length <= 2;

  return isValidLength;
};

export const useProjectTerm = (projectTerm: Project["projectTerm"]) => {
  const { startYear, startMonth, endYear, endMonth } = parseProjectTerm(projectTerm);

  const { input: projectTermYearStartInput, onChangeInput: _onChangeProjectTermYearStart } = useInput(startYear);
  const { input: projectTermMonthStartInput, onChangeInput: _onChangeProjectTermMonthStart } = useInput(startMonth);
  const { input: projectTermYearEndInput, onChangeInput: _onChangeProjectTermYearEnd } = useInput(endYear);
  const { input: projectTermMonthEndInput, onChangeInput: _onChangeProjectTermMonthEnd } = useInput(endMonth);

  const onChangeProjectTermYearStart: ChangeEventHandler<HTMLInputElement> = event => {
    const year = event.target.value;
    if (!isValidYear(year)) return;

    _onChangeProjectTermYearStart(event);
  };
  const onChangeProjectTermMonthStart: ChangeEventHandler<HTMLInputElement> = event => {
    const month = event.target.value;

    if (!isValidMonth(month)) return;

    _onChangeProjectTermMonthStart(event);
  };
  const onChangeProjectTermYearEnd: ChangeEventHandler<HTMLInputElement> = event => {
    const year = event.target.value;
    if (!isValidYear(year)) return;

    _onChangeProjectTermYearEnd(event);
  };
  const onChangeProjectTermMonthEnd: ChangeEventHandler<HTMLInputElement> = event => {
    const month = event.target.value;
    if (!isValidMonth(month)) return;

    _onChangeProjectTermMonthEnd(event);
  };

  return {
    projectTermYearStartInput,
    projectTermMonthStartInput,
    projectTermYearEndInput,
    projectTermMonthEndInput,
    onChangeProjectTermYearStart,
    onChangeProjectTermMonthStart,
    onChangeProjectTermYearEnd,
    onChangeProjectTermMonthEnd
  };
};
