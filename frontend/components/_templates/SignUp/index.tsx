import TosCheckBox from "@/components/Auth/TosCheckBox";
import TosContent from "@/components/Auth/TosContent";
import OAUTH_END_POINT from "@/components/_common/LoginButton/constants/oauthEndPoiint";
import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import TOS_CONTENT from "@/components/_templates/SignUp/constants/TosContent";
import { setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as S from "./styles";

const SignUp = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const onToggle = () => {
    setIsChecked(state => !state);
  };

  const onClickKakaoLoginButton = async () => {
    if (isChecked) {
      router.push(OAUTH_END_POINT.KAKAO);
    }
  };

  useEffect(() => {
    setLocalStorage("tos", isChecked);
  }, [isChecked]);

  return (
    <S.Screen title="회원가입" description="회원가입 페이지">
      <S.Frame>
        <S.Header>회원가입</S.Header>
        <S.Body>
          <S.InputsWrapper>
            <TosContent label="약관" textContent={TOS_CONTENT} />
            <TosCheckBox isChecked={isChecked} text="이용약관 및 개인정보 처리방침에 동의합니다." onClick={onToggle} />
          </S.InputsWrapper>

          <S.ButtonsWrapper>
            <KakaoLoginButton disabled={!isChecked} onClick={onClickKakaoLoginButton} />
          </S.ButtonsWrapper>
        </S.Body>
      </S.Frame>
    </S.Screen>
  );
};

export default SignUp;
