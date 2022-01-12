import LoginModal from "@/components/Auth/LoginModal";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import Link from "next/link";
import Avatar from "../Avatar";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {
  user?: boolean;
}

const Header = ({ user, ...props }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModal({});

  const onClickLoginButton = () => {
    openModal();
  };

  return (
    <>
      <S.Frame {...props}>
        <Link href={ROUTE.HOME} passHref={true}>
          <S.BrandInfoWrapper>
            <Logo size="md" />
            <S.BrandName>JASO-GPT</S.BrandName>
          </S.BrandInfoWrapper>
        </Link>
        <div>
          {user ? (
            <Avatar src="/profile_default.png" alt="profile image" size="sm" />
          ) : (
            <Button size="md" onClick={onClickLoginButton}>
              로그인
            </Button>
          )}
        </div>
      </S.Frame>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
