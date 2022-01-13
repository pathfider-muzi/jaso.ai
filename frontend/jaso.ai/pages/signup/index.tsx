import TermsAndConditions from "@/components/Auth/TermsAndConditions";
import InputForm from "@/components/_common/InputForm";
import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import { NextPage } from "next";
import { useState } from "react";
import * as S from "./styles";

const SignUp: NextPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onToggle = () => {
    setIsChecked((state) => !state);
  };

  return (
    <S.Screen title="회원가입" description="회원가입 페이지">
      <S.Frame>
        <S.Header>회원가입 (임시)</S.Header>
        <S.Body>
          <S.InputsWrapper>
            <InputForm
              label="약관"
              value="약관이 들어갈거에요요용"
              isRequired={true}
            />

            <TermsAndConditions
              isChecked={isChecked}
              text="이용약관 및 개인정보 처리방침에 동의합니다."
              onClick={onToggle}
            />
          </S.InputsWrapper>

          <S.ButtonsWrapper>
            <KakaoLoginButton disabled={!isChecked} />
          </S.ButtonsWrapper>
        </S.Body>
      </S.Frame>
    </S.Screen>
  );
};

export default SignUp;
