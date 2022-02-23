import LoginModal from "@/components/Auth/LoginModal";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import * as S from "./styles";

const MainIntroduction = ({ ...props }) => {
  const { isModalOpen, openModal, closeModal } = useModal({});
  const { user } = useUser({ enabled: false });
  const router = useRouter();

  const onClickGetStartButton = () => {
    if (user) {
      router.push(ROUTE.RESUME);
    } else {
      router.push(ROUTE.GUEST_RESUME);
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
          <S.DownArrow>
            <Image src="/down_arrow.png" alt="down arrow" width="70" height="50" />
          </S.DownArrow>
        </a>
      </S.Frame>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default MainIntroduction;
