import LoginModal from "@/components/Auth/LoginModal";
import useModal from "@/hooks/useModal";
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

        <S.Description>AI가 맞춤자소서들을 추천해드립니다!</S.Description>

        <S.Button onClick={onClickGetStartButton}>Get Start &rarr;</S.Button>
      </S.Frame>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ServiceIntroduction;
