import Avatar from "@/components/_common/Avatar";
import { Option as DropDownOptionType } from "@/components/_common/DropDownOption";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import { removeLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  profileImage: string;
}

const AvatarDropDown = ({ isOpen, profileImage, onToggle, ...props }: Props) => {
  const router = useRouter();
  const options: DropDownOptionType[] = [
    {
      label: "내 정보",
      onClick: () => {
        router.push(ROUTE.USER_PROFILE);
      }
    },
    {
      label: "로그아웃",
      onClick: () => {
        removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

        router.push(ROUTE.HOME);
      }
    }
  ];

  return (
    <S.Frame {...props}>
      <S.AvatarWrapper type="button" onClick={onToggle}>
        <Avatar src={profileImage} alt="avatar image" size="sm" />
      </S.AvatarWrapper>
      {isOpen && <S.DropDownOption options={options} />}
    </S.Frame>
  );
};

export default AvatarDropDown;
