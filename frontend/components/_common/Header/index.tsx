import LoginModal from "@/components/Auth/LoginModal";
import BRAND_NAME from "@/constants/brandName";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useCustomAlert from "@/hooks/Editor/useAlert";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "@/utils/localStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import Logo from "../Logo";
import * as S from "./styles";

interface Props {}

const Header = ({ ...props }: Props) => {
  const { user } = useUser({ enabled: !!getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) });

  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal({});
  const { isModalOpen: isAvatarDropDownOpen, toggleModal: toggleAvatarDropdown } = useModal({});

  const router = useRouter();

  const onClickLoginButton = () => {
    openLoginModal();
  };

  const tryOpenCustomAlert = useCustomAlert();

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
          <S.NavButton
            type="button"
            onClick={() => {
              tryOpenCustomAlert(ROUTE.MY_SELFINTRODUCTIONS);
            }}
          >
            자기소개서 에디터
          </S.NavButton>

          <S.NavButton
            type="button"
            onClick={() => {
              tryOpenCustomAlert(!!user ? ROUTE.RESUME : ROUTE.GUEST_RESUME);
            }}
          >
            자기소개서 생성
          </S.NavButton>
          <S.NavButton
            type="button"
            onClick={() => {
              tryOpenCustomAlert(ROUTE.INTRODUCTION_RECOMMENDATION);
            }}
          >
            자기소개서 검색
          </S.NavButton>
          <Link href={"https://predev.dev"} passHref>
            <S.NavLink target="_blank">면접준비</S.NavLink>
          </Link>
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
