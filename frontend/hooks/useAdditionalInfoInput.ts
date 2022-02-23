import useInput from "@/hooks/useInput";
import useMultipleReactSelectInput from "@/hooks/useMultipleReactSelectInput";
import useReactSelectInput from "@/hooks/useReactSelectInput";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";

const useAdditionalInfoInput = () => {
  const { user } = useUser({ enabled: false });

  const { input: university, setInput: setUniversity, onChangeInput: onChangeUniversity } = useReactSelectInput("");
  const { input: major, setInput: setMajor, onChangeInput: onChangeMajor } = useReactSelectInput("");
  const { input: career, setInput: setCareer, onChangeInput: onChangeCareer } = useReactSelectInput("");
  const { input: grade, setInput: setGrade, onChangeInput: onChangeGrade } = useInput("");
  const { input: languageScore, setInput: setLanguageScore, onChangeInput: onChangeLanguageScore } = useInput("");
  const { input: activity, setInput: setActivity, onChangeInput: onChangeActivity } = useInput("");
  const { input: licenses, setInput: setLicenses, onChangeInput: onChangeLicenses } = useMultipleReactSelectInput([""]);

  useEffect(() => {
    setUniversity(user?.userInfos[0]?.university || "");
    setMajor(user?.userInfos[0].major || "");
    setGrade(user?.userInfos[0].grade || "");
    setLanguageScore(user?.userInfos[0].languageScore || "");
    setCareer(user?.userInfos[0].career || "");
    setActivity(user?.userInfos[0].activity || "");
    setLicenses(user?.userInfos[0].license?.split(" / ") || []);
  }, [user]);

  return {
    university,
    major,
    grade,
    languageScore,
    career,
    activity,
    licenses,
    onChangeUniversity,
    onChangeMajor,
    onChangeGrade,
    onChangeLanguageScore,
    onChangeCareer,
    onChangeActivity,
    onChangeLicenses
  };
};

export default useAdditionalInfoInput;
