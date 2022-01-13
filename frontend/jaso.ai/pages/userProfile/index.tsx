import { NextPage } from "next";
import * as S from "./styles";

const UserProfile: NextPage = () => {
  return (
    <S.Screen title="회원정보" description="유저 프로필 페이지">
      <S.Frame>
        <S.PersonalInformation />
        <S.AdditionalInformationContainer />
      </S.Frame>
    </S.Screen>
  );
};

export default UserProfile;
