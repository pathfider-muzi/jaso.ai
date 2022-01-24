import updateUserInfo from "@/api/updateUserInfo";
import Button from "@/components/_common/Button";
import InputForm from "@/components/_common/InputForm";
import useUser from "@/hooks/useUser";
import { useQuery } from "react-query";
import CollegeSelector from "../CollegeSelector";
import useAdditionalInfoInput from "../CollegeSelector/hooks/useAdditionalInfoInput";
import MajorSelector from "../MajorSelector";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdditionalInformationModal = ({ isOpen, onClose }: Props) => {
  const { user, getUser } = useUser({
    enabled: false
  });

  const {
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
  } = useAdditionalInfoInput();

  const { refetch: refetchUpdateUserInfo, isFetched: isUpdateInfoFetched } = useQuery<boolean>(
    ["user-info", user?.id],
    () =>
      updateUserInfo({
        name: user?.userInfos[0].name || "",
        email: user?.userInfos[0].email || "",
        university,
        major,
        grade,
        languageScore,
        career,
        activity,
        license
      }),
    {
      enabled: false,
      onSettled: () => {
        onClose();
        getUser();
      }
    }
  );

  const onClickSaveButton = () => {
    refetchUpdateUserInfo();
  };

  const isFieldAllSettled = [university, major, grade, languageScore, career, activity, license].every(
    value => !!value
  );

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="추가정보">
      <S.InfoList>
        <CollegeSelector defaultValue={university} onChange={onChangeUniversity} />
        <MajorSelector defaultValue={major} onChange={onChangeMajor} />
        <InputForm type={"number"} label="성적" value={grade} isRequired={true} onChange={onChangeGrade} />
        <InputForm label="직군" value={career} isRequired={true} onChange={onChangeCareer} />
        <InputForm label="자격증" value={license} isRequired={true} onChange={onChangeLicense} />
        <InputForm label="활동" value={activity} isRequired={true} onChange={onChangeActivity} />
        <InputForm label="어학점수" value={languageScore} isRequired={true} onChange={onChangeLanguageScore} />
      </S.InfoList>
      <S.Footer>
        <Button size="md" onClick={onClose}>
          취소
        </Button>
        <S.SaveButton size="md" onClick={onClickSaveButton} disabled={!isFieldAllSettled}>
          저장
        </S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default AdditionalInformationModal;
