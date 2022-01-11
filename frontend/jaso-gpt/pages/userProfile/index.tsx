import { NextPage } from "next";
import Screen from "@/components/layouts/Screen";
import AdditionalInformationContainer from "@/components/User/AdditionalInformationContainer";
import * as S from "./styles";

const UserProfile: NextPage = () => {
  return (
    <Screen title="회원정보" description="유저 프로필 페이지">
      <S.Frame>
        <S.PersonalInformation />
        <AdditionalInformationContainer />
      </S.Frame>
    </Screen>
  );
};

export default UserProfile;
