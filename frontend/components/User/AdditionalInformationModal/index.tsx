import updateUserInfo from "@/api/updateUserInfo";
import Button from "@/components/_common/Button";
import InputForm from "@/components/_common/InputForm";
import MultiSelector from "@/components/_common/MutiSelector";
import Selector from "@/components/_common/Selector";
import CAREER_CATEGORY from "@/constants/careerList";
import COLLEGE_LIST from "@/constants/collegeList";
import LICENSE_LIST from "@/constants/licenseList";
import MAJOR_LIST from "@/constants/majorList";
import NON_SELECT_VALUE from "@/constants/nonSelectValue";
import useUser from "@/hooks/useUser";
import { useMutation } from "react-query";
import useAdditionalInfoInput from "./hooks/useAdditionalInfoInput";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdditionalInformationModal = ({ isOpen, onClose }: Props) => {
  const { user, getUser } = useUser({ enabled: true });

  const {
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
  } = useAdditionalInfoInput();

  const updateUserInfoMutation = useMutation(updateUserInfo, {
    onSettled: () => {
      onClose();
      getUser();
    }
  });

  const onClickSaveButton = () => {
    updateUserInfoMutation.mutate({
      name: user?.userInfos[0].name || "",
      email: user?.userInfos[0].email || "",
      university,
      major,
      grade,
      languageScore,
      career,
      activity,
      license: licenses.join(" / ")
    });
  };

  const isRequiredFieldAllSettled = [
    major.replace(NON_SELECT_VALUE, ""),
    grade.replace(NON_SELECT_VALUE, ""),
    career,
    activity
  ].every(value => !!value);

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="추가정보">
      <S.InfoList>
        <Selector
          label="대학교"
          data={COLLEGE_LIST}
          defaultValue={university}
          isRequired={false}
          onChange={onChangeUniversity}
        />
        <Selector label="전공" data={MAJOR_LIST} defaultValue={major} isRequired={true} onChange={onChangeMajor} />
        <InputForm type="number" label="성적" value={grade} isRequired={true} onChange={onChangeGrade} />
        <Selector
          label="직무"
          data={CAREER_CATEGORY}
          defaultValue={career}
          isRequired={true}
          onChange={onChangeCareer}
        />
        <MultiSelector
          label="자격증"
          data={LICENSE_LIST}
          defaultValue={licenses}
          isRequired={false}
          onChange={onChangeLicenses}
        />

        <InputForm label="활동" value={activity} isRequired={true} onChange={onChangeActivity} />
        <InputForm label="어학점수" value={languageScore} isRequired={false} onChange={onChangeLanguageScore} />
      </S.InfoList>
      <S.Footer>
        <Button size="md" onClick={onClose}>
          취소
        </Button>
        <S.SaveButton size="md" onClick={onClickSaveButton} disabled={!isRequiredFieldAllSettled}>
          저장
        </S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default AdditionalInformationModal;
