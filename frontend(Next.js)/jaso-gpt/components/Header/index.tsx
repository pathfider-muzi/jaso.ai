import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {
  user?: boolean;
}

const Header = ({ user }: Props) => {
  return (
    <S.Frame>
      <S.BrandInfoWrapper>
        <Logo _size="md" />
        <S.BrandName>JASO-GPT</S.BrandName>
      </S.BrandInfoWrapper>
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
