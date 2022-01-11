import useModal from "@/hooks/useModal";
import Image from "next/image";
import AdditionalInformation from "../AdditionalInformation";
import AdditionalInformationModal from "../AdditionalInformationModal";
import * as S from "./styles";

const AdditionalInformationContainer = () => {
  const { isModalOpen, closeModal, openModal } = useModal({});

  return (
    <S.Frame>
      <S.Header>
        <S.Title>추가정보</S.Title>
        <S.EditButton type="button" onClick={openModal}>
          <Image src="/edit.png" alt="edit icon" width={20} height={20} />
        </S.EditButton>
      </S.Header>
      <S.InfoList>
        <AdditionalInformation label="직군" value="개발" />
        <AdditionalInformation label="직무" value="프론트엔드" />
        <AdditionalInformation label="경력" value="신입" />
        <AdditionalInformation label="현재 연봉" value="x,000만원" />
      </S.InfoList>

      <AdditionalInformationModal isOpen={isModalOpen} onClose={closeModal} />
    </S.Frame>
  );
};

export default AdditionalInformationContainer;
