import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const KakaoLoginButton = ({ ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <Image src="/kakao_login.png" alt="카카오 로그인 이미지" width="400" height="60" priority={true} />
    </S.Frame>
  );
};

export default KakaoLoginButton;
