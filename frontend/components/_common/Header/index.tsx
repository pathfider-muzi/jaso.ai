import LoginModal from "@/components/Auth/LoginModal";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {}

const Header = ({ ...props }: Props) => {
  const { user } = useUser({ enabled: true });
  const router = useRouter();

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

        <S.Nav>
          <S.NavButton type="button" onClick={() => alert("준비중입니다.")}>
            공지사항
          </S.NavButton>
          <S.NavButton
            type="button"
            onClick={() => {
              router.push(ROUTE.MY_RESUMES);
            }}
          >
            내 자기소개서
          </S.NavButton>
        </S.Nav>

        <S.AuthInfoWrapper>
          {user ? (
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
        </S.AuthInfoWrapper>
      </S.Frame>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header;
