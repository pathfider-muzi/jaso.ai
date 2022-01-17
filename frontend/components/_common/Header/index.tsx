import LoginModal from "@/components/Auth/LoginModal";
import AvatarDropDown from "@/components/User/AvatarDropDown";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import Link from "next/link";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {
  user?: boolean;
}

const Header = ({ user, ...props }: Props) => {
  const {
    isModalOpen: isLoginModalOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal({});
  const {
    isModalOpen: isAvatarDropDownOpen,
    toggleModal: toggleAvatarDropdown,
  } = useModal({});

  const onClickLoginButton = () => {
    openLoginModal();
  };

  return (
    <>
      <S.Frame {...props}>
        <Link href={ROUTE.HOME} passHref={true}>
          <S.BrandInfoWrapper>
            <Logo size="md" />
            <S.BrandName>{BRAND_NAME}</S.BrandName>
          </S.BrandInfoWrapper>
        </Link>
        <div>
          {user ? (
            <AvatarDropDown
              isOpen={isAvatarDropDownOpen}
              profileImage={"/profile_default.png"}
              onToggle={toggleAvatarDropdown}
            />
          ) : (
            <Button size="md" onClick={onClickLoginButton}>
              로그인
            </Button>
          )}
        </div>
      </S.Frame>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header;
