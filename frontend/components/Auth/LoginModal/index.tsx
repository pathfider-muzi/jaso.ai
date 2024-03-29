import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import ROUTE from "@/constants/routes";
import { useRouter } from "next/router";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();

  const onClickMoveSignUpButton = () => {
    router.push(ROUTE.SIGN_UP);
  };

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="로그인이 필요합니다.">
      <S.ButtonsWrapper>
        <KakaoLoginButton />
      </S.ButtonsWrapper>

      <S.Footer>
        <S.MoveSignUpButton onClick={onClickMoveSignUpButton}>아직 회원이 아니신가요?</S.MoveSignUpButton>
      </S.Footer>
    </S.Frame>
  );
};

export default LoginModal;
