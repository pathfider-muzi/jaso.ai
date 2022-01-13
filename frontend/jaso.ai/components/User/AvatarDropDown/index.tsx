import Avatar from "@/components/_common/Avatar";
import { Option as DropDownOptionType } from "@/components/_common/DropDownOption";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  profileImage: string;
}

const AvatarDropDown = ({ isOpen, profileImage, onToggle }: Props) => {
  const options: DropDownOptionType[] = [
    {
      label: "내 정보",
      onClick: () => alert("내 정보 클릭"),
    },
    {
      label: "로그아웃",
      onClick: () => alert("로그아웃 클릭"),
    },
  ];

  return (
    <S.Frame>
      <S.AvatarWrapper type="button" onClick={onToggle}>
        <Avatar src={profileImage} alt="avatar image" size="sm" />
      </S.AvatarWrapper>
      {isOpen && <S.DropDownOption options={options} />}
    </S.Frame>
  );
};

export default AvatarDropDown;
