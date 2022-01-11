import Link from "next/link";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {
  user?: boolean;
}

const Header = ({ user, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <Link href={"/"} passHref={true}>
        <S.BrandInfoWrapper>
          <Logo size="md" />
          <S.BrandName>JASO-GPT</S.BrandName>
        </S.BrandInfoWrapper>
      </Link>
      <div>
        {user ? (
          <Button size="md">로그아웃</Button>
        ) : (
          <S.ButtonsWrapper>
            <Button size="md">로그인</Button>
            <Button size="md">회원가입</Button>
          </S.ButtonsWrapper>
        )}
      </div>
    </S.Frame>
  );
};

export default Header;
