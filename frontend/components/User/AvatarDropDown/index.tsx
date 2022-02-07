import Avatar from "@/components/_common/Avatar";
import { Option as DropDownOptionType } from "@/components/_common/DropDownOption";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useCustomAlert from "@/hooks/Editor/useAlert";
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
  const tryOpenCustomAlert = useCustomAlert();

  const options: DropDownOptionType[] = [
    {
      label: "내 정보",
      onClick: () => {
        tryOpenCustomAlert(ROUTE.USER_PROFILE);
      }
    },
    {
      label: "로그아웃",
      onClick: () => {
        tryOpenCustomAlert(ROUTE.USER_PROFILE);
        removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

        router.push(ROUTE.HOME);
      }
    }
  ];

  return (
    <S.Frame {...props}>
      <S.AvatarWrapper type="button" onClick={onToggle}>
        <Avatar src={profileImage} alt="avatar image" size="md" />
      </S.AvatarWrapper>
      {isOpen && <S.DropDownOption options={options} />}
    </S.Frame>
  );
};

export default AvatarDropDown;
