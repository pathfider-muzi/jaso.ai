import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import AdditionalInformation from "../AdditionalInformation";
import AdditionalInformationModal from "../AdditionalInformationModal";
import * as S from "./styles";

const AdditionalInformationContainer = ({ ...props }) => {
  const { isModalOpen, closeModal, openModal } = useModal({});
  const { user } = useUser({});

  return (
    <S.Frame {...props}>
      <S.Header>
        <S.Title>추가정보</S.Title>
        <S.EditButton onClick={openModal}>
          <Image src="/edit.png" alt="edit icon" width={20} height={20} />
        </S.EditButton>
      </S.Header>
      <S.InfoList>
        <AdditionalInformation label="대학교" value={user?.userInfo?.university || "-"} />
        <AdditionalInformation label="전공" value={user?.userInfo?.major || "-"} />
        <AdditionalInformation label="성적" value={user?.userInfo?.grade || "-"} />
        <AdditionalInformation label="직군" value={user?.userInfo?.career || "-"} />
        <AdditionalInformation label="자격증" value={user?.userInfo?.languageScore || "-"} />
        <AdditionalInformation label="활동" value={user?.userInfo?.activity || "-"} />
        <AdditionalInformation label="어학점수" value={user?.userInfo?.languageScore || "-"} />
      </S.InfoList>

      <AdditionalInformationModal isOpen={isModalOpen} onClose={closeModal} />
    </S.Frame>
  );
};

export default AdditionalInformationContainer;
