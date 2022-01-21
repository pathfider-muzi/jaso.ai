import LoginModal from "@/components/Auth/LoginModal";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {}

const Header = ({ ...props }: Props) => {
  const { user } = useUser({});

  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal({});
  const { isModalOpen: isAvatarDropDownOpen, toggleModal: toggleAvatarDropdown } = useModal({});

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
          {!!user?.agreeToTerms ? (
            <S.AvatarDropDown
              isOpen={isAvatarDropDownOpen}
              profileImage={user.profileImage}
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
