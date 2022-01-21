import Button from "@/components/_common/Button";
import InputForm from "@/components/_common/InputForm";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import CollegeSelector from "../CollegeSelector";
import MajorSelector from "../MajorSelector";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdditionalInformationModal = ({ isOpen, onClose }: Props) => {
  const { user } = useUser({});

  const [collegeName, setCollegeName] = useState(() => {
    return user?.userInfo?.university || "-";
  });
  const [major, setMajor] = useState(() => {
    return user?.userInfo?.major || "-";
  });
  const [grade, setGrade] = useState(() => {
    return user?.userInfo?.grade || "-";
  });
  const [languageScore, setLanguageScore] = useState(() => {
    return user?.userInfo?.languageScore || "-";
  });
  const [career, setCareer] = useState(() => {
    return user?.userInfo?.career || "-";
  });
  const [activity, setActivity] = useState(() => {
    return user?.userInfo?.activity || "-";
  });
  const [license, setLicense] = useState(() => {
    return user?.userInfo?.license || "-";
  });

  const onClickSaveButton = () => {};

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="추가정보">
      <S.InfoList>
        <CollegeSelector defaultValue={collegeName} onChange={() => {}} />
        <MajorSelector defaultValue={major} onChange={() => {}} />
        <InputForm label="성적" value={grade} isRequired={true} />
        <InputForm label="직군" value={career} isRequired={true} />
        <InputForm label="자격증" value={license} isRequired={true} />
        <InputForm label="활동" value={activity} isRequired={true} />
        <InputForm label="어학점수" value={languageScore} isRequired={true} />
      </S.InfoList>
      <S.Footer>
        <Button size="md" onClick={onClose}>
          취소
        </Button>
        <S.SaveButton size="md" onClick={onClickSaveButton}>
          저장
        </S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default AdditionalInformationModal;
