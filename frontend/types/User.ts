import { SelfIntroduction } from "./SelfIntroduction";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  university: string;
  major: string;
  grade: string;
  languageScore: string;
  career: string;
  activity: string;
  license: string;
}

export interface User {
  id: number;
  kakaoId: number;
  nickname: string;
  profileImage: string;
  agreeToTerms: boolean;
  userInfo: UserInfo;
  selfIntroductions: SelfIntroduction[];
}
