import TosCheckBox from "@/components/Auth/TosCheckBox";
import TosContent from "@/components/Auth/TosContent";
import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import TOS_CONTENT from "@/components/_templates/SignUp/constants/TosContent";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { ChangeEventHandler, useEffect, useState } from "react";
import * as S from "./styles";

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeCheckBox: ChangeEventHandler<HTMLInputElement> = () => {
    setIsChecked(state => !state);
  };

  useEffect(() => {
    if (isChecked) {
      setLocalStorage(LOCAL_STORAGE_KEY.TOS_AGREE, true);
    } else {
      removeLocalStorage(LOCAL_STORAGE_KEY.TOS_AGREE);
    }
  }, [isChecked]);

  return (
    <S.Screen title="회원가입" description="회원가입 페이지">
      <S.Frame>
        <S.Header>회원가입</S.Header>
        <S.Body>
          <S.InputsWrapper>
            <TosContent label="약관" textContent={TOS_CONTENT} />
            <TosCheckBox
              isChecked={isChecked}
              text="이용약관 및 개인정보 처리방침에 동의합니다."
              onChange={onChangeCheckBox}
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
