import Avatar from "@/components/_common/Avatar";
import useUser from "@/hooks/useUser";
import * as S from "./styles";

const PersonalInformation = ({ ...props }) => {
  const { user } = useUser({});

  return (
    <S.Frame {...props}>
      <Avatar src={user?.profileImage || "/default_profile.png"} alt={`${user?.nickname} avatar`} size="lg" />
      <S.Name>{user?.nickname}</S.Name>
      <S.Email>{user?.userInfos[0]?.email}</S.Email>
    </S.Frame>
  );
};

export default PersonalInformation;
