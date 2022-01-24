import useInput from "@/hooks/useInput";
import useReactSelectInput from "@/hooks/useReactSelectInput";
import useUser from "@/hooks/useUser";
import { SingleValue } from "react-select";

const useAdditionalInfoInput = () => {
  const { user } = useUser({ enabled: false });

  const { input: university, setInput: setUniversity } = useReactSelectInput(user?.userInfos[0].university || "");
  const { input: major, setInput: setMajor } = useReactSelectInput(user?.userInfos[0].major || "");

  const { input: grade, onChangeInput: onChangeGrade } = useInput(user?.userInfos[0].grade || "");
  const { input: languageScore, onChangeInput: onChangeLanguageScore } = useInput(user?.userInfos[0].grade || "");
  const { input: career, onChangeInput: onChangeCareer } = useInput(user?.userInfos[0].career || "");
  const { input: activity, onChangeInput: onChangeActivity } = useInput(user?.userInfos[0].activity || "");
  const { input: license, onChangeInput: onChangeLicense } = useInput(user?.userInfos[0].license || "");

  const onChangeUniversity = (
    option: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setUniversity(option?.value || "");
  };

  const onChangeMajor = (
    option: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setMajor(option?.value || "");
  };

  return {
    university,
    major,
    grade,
    languageScore,
    career,
    activity,
    license,
    onChangeUniversity,
    onChangeMajor,
    onChangeGrade,
    onChangeLanguageScore,
    onChangeCareer,
    onChangeActivity,
    onChangeLicense
  };
};

export default useAdditionalInfoInput;
