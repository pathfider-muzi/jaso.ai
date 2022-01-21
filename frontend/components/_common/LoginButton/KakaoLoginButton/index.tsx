import Image from "next/image";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import OAUTH_END_POINT from "../constants/oauthEndPoiint";
import * as S from "./styles";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: () => void;
}

const KakaoLoginButton = ({ onClick, ...props }: Props) => {
  const router = useRouter();
  const onClickButton = () => {
    router.push(OAUTH_END_POINT.KAKAO);
  };

  return (
    <S.Frame {...props} onClick={onClick ? onClick : onClickButton} type="button">
      <Image src="/kakao_login.png" alt="카카오 로그인 이미지" width="400" height="60" priority={true} />
    </S.Frame>
  );
};

export default KakaoLoginButton;
