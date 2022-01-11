import Avatar from "@/components/common/Avatar";
import * as S from "./styles";

const PersonalInformation = ({ ...props }) => {
  const user = {
    name: "Lyn",
    profileUrl: "/profile_default.png",
    email: "asd@kakaobrain.com",
    phoneNumber: "010-1234-1234",
  };

  return (
    <S.Frame {...props}>
      <Avatar src={user.profileUrl} alt={`${user.name} avatar`} size="lg" />
      <S.Name>{user.name}</S.Name>
      <S.Email>{user.email}</S.Email>
      <S.PhoneNumber>{user.phoneNumber}</S.PhoneNumber>
    </S.Frame>
  );
};

export default PersonalInformation;
