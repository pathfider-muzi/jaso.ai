import Link from "next/link";
import Avatar from "../Avatar";
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
          <Avatar src="/profile_default.png" alt="profile image" size="sm" />
        ) : (
          <Button size="md">로그인</Button>
        )}
      </div>
    </S.Frame>
  );
};

export default Header;
