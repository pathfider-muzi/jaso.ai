import updateUserInfo from "@/api/updateUserInfo";
import useAdditionalInfoInput from "@/hooks/useAdditionalInfoInput";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import AdditionalInformation from "../AdditionalInformation";
import AdditionalInformationModal from "../AdditionalInformationModal";
import * as S from "./styles";

const AdditionalInformationContainer = ({ ...props }) => {
  const router = useRouter();
  const { isModalOpen, closeModal, openModal } = useModal({
    defaultValue: false
  });
  const { user, deleteUser, getUser } = useUser({ enabled: false });

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

  const onClickDeleteUserButton = () => {
    if (confirm("정말로 회원탈퇴하시겠습니까?")) deleteUser();
  };

  const updateUserInfoMutation = useMutation(updateUserInfo, {
    onSettled: () => {
      closeModal();
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

  return (
    <S.Frame {...props}>
      <S.Header>
        <S.Title>추가정보</S.Title>
        <S.EditButton onClick={openModal}>
          <Image src="/edit.png" alt="edit icon" width={20} height={20} />
        </S.EditButton>
      </S.Header>
      <S.InfoList>
        <AdditionalInformation label="대학교" value={user?.userInfos[0].university || "-"} />
        <AdditionalInformation label="전공" value={user?.userInfos[0].major || "-"} />
        <AdditionalInformation label="성적" value={user?.userInfos[0].grade || "-"} />
        <AdditionalInformation label="직군" value={user?.userInfos[0].career || "-"} />
        <AdditionalInformation label="자격증" value={user?.userInfos[0].license || "-"} />
        <AdditionalInformation label="활동" value={user?.userInfos[0].activity || "-"} />
        <AdditionalInformation label="어학점수" value={user?.userInfos[0].languageScore || "-"} />
      </S.InfoList>

      <S.Footer>
        <S.DeleteUserButton onClick={onClickDeleteUserButton}>회원탈퇴</S.DeleteUserButton>
      </S.Footer>

      <AdditionalInformationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onClickSaveButton={onClickSaveButton}
        additionalInput={{
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
        }}
      />
    </S.Frame>
  );
};

export default AdditionalInformationContainer;
