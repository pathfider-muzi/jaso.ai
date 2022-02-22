import Button from "@/components/_common/Button";
import InputForm from "@/components/_common/InputForm";
import MultiSelector from "@/components/_common/MultiSelector";
import Selector from "@/components/_common/Selector";
import CAREER_CATEGORY from "@/constants/careerList";
import COLLEGE_LIST from "@/constants/collegeList";
import LICENSE_LIST from "@/constants/licenseList";
import MAJOR_LIST from "@/constants/majorList";
import NON_SELECT_VALUE from "@/constants/nonSelectValue";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  additionalInput: ReturnType<typeof useAdditionalInfoInput>;
  onClickSaveButton: () => void;
}

const AdditionalInformationModal = ({ isOpen, onClose, additionalInput, onClickSaveButton }: Props) => {
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
  } = additionalInput;

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
        <InputForm
          type="number"
          label="성적"
          value={grade}
          isRequired={true}
          onChange={onChangeGrade}
          placeholder="평점만 넣어주세요. ex) 3.8"
        />
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

        <InputForm
          label="활동"
          value={activity}
          isRequired={true}
          onChange={onChangeActivity}
          placeholder="자유양식 ex) 공기업 인턴 1회"
        />

        <InputForm
          label="어학점수"
          value={languageScore}
          isRequired={false}
          onChange={onChangeLanguageScore}
          placeholder="자유양식 ex) 토익 900점"
        />
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
