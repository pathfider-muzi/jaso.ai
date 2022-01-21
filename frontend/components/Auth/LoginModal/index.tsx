import OAUTH_END_POINT from "@/components/_common/LoginButton/constants/oauthEndPoiint";
import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const { user } = useUser({ enabled: false });

  const onClickKakaoLoginButton = () => {
    if (user?.agreeToTerms) {
      router.push(ROUTE.SIGN_UP);
    } else {
      router.push(OAUTH_END_POINT.KAKAO);
    }
  };

  const onClickMoveSignUpButton = () => {
    router.push(ROUTE.SIGN_UP);
  };

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="로그인">
      <S.ButtonsWrapper>
        <KakaoLoginButton onClick={onClickKakaoLoginButton} />
      </S.ButtonsWrapper>

      <S.Footer>
        <S.MoveSignUpButton onClick={onClickMoveSignUpButton}>아직 회원이 아니신가요?</S.MoveSignUpButton>
      </S.Footer>
    </S.Frame>
  );
};

export default LoginModal;
