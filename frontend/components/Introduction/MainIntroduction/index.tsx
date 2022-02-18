import LoginModal from "@/components/Auth/LoginModal";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { removeLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import * as S from "./styles";

const MainIntroduction = ({ ...props }) => {
  const { isModalOpen, openModal, closeModal } = useModal({});
  const { user } = useUser({});
  const router = useRouter();

  const onClickGetStartButton = () => {
    if (user) {
      router.push(ROUTE.MY_SELFINTRODUCTIONS);
    } else {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      openModal();
    }
  };

  return (
    <>
      <S.Frame {...props}>
        <S.HeroGradient>
          <S.PinkCircle />
          <S.GreenCircle />
          <S.VioletCircle />
        </S.HeroGradient>
        <S.Title>AI 자소서 Assistant</S.Title>

        <S.Description>AI가 자기소개서 작성을 도와드립니다.</S.Description>

        <S.Button onClick={onClickGetStartButton}>Get Start &rarr;</S.Button>

        <a href="#subIntroduction">
          <S.DownArrow>&darr;</S.DownArrow>
        </a>
      </S.Frame>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default MainIntroduction;
