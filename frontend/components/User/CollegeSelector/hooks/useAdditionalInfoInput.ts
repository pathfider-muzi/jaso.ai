import useInput from "@/hooks/useInput";
import useReactSelectInput from "@/hooks/useReactSelectInput";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { SingleValue } from "react-select";

const useAdditionalInfoInput = () => {
  const { user } = useUser({ enabled: false });

  const { input: university, setInput: setUniversity } = useReactSelectInput("");
  const { input: major, setInput: setMajor } = useReactSelectInput("");
  const { input: grade, setInput: setGrade, onChangeInput: onChangeGrade } = useInput("");
  const { input: languageScore, setInput: setLanguageScore, onChangeInput: onChangeLanguageScore } = useInput("");
  const { input: career, setInput: setCareer, onChangeInput: onChangeCareer } = useInput("");
  const { input: activity, setInput: setActivity, onChangeInput: onChangeActivity } = useInput("");
  const { input: license, setInput: setLicenses, onChangeInput: onChangeLicense } = useInput("");

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

  useEffect(() => {
    if (!user) return;

    setUniversity(user.userInfos[0].university || "");
    setMajor(user.userInfos[0].major || "");
    setGrade(user.userInfos[0].grade || "");
    setLanguageScore(user.userInfos[0].languageScore || "");
    setCareer(user.userInfos[0].career || "");
    setActivity(user.userInfos[0].activity || "");
    setLicenses(user.userInfos[0].license || "");
  }, [user]);

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
