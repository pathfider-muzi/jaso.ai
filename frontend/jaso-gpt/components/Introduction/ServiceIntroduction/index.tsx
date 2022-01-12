import LoginModal from "@/components/Auth/LoginModal";
import useModal from "@/hooks/useModal";
import Link from "next/link";
import * as S from "./styles";

const ServiceIntroduction = ({ ...props }) => {
  const { isModalOpen, openModal, closeModal } = useModal({});

  const onClickGetStartButton = () => {
    openModal();
  };

  return (
    <>
      <S.Frame {...props}>
        <S.Title>AI 자소서 Assistant</S.Title>

        <S.Description>
          카카오브레인의 [koGPT]가 자기소개서 작성을 도와드립니다
        </S.Description>

        <S.Button onClick={onClickGetStartButton}>Get Start &rarr;</S.Button>
      </S.Frame>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ServiceIntroduction;
