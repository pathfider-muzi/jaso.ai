import { UserInfo } from "@/types/User";

/*
activity: "-"
career: "시스템프로그래머"
email: "lynn312@naver.com"
grade: "3.4"
id: 3
languageScore: "-"
license: "컴퓨터그래픽스운용기능사"
major: "컴퓨터공학과"
name: ""
university: "가야대학교(고령) 제2캠퍼 스

*/
const makeUserInfoJsonToString = (json: UserInfo) => {
  const str: string = "";
  const EXCLUDE_KEY_NAMES = ["name", "email", "id"];

  Object.entries(json).forEach(function ([key, value]) {
    if (key in EXCLUDE_KEY_NAMES) {
      return;
    }
    str.concat(" / ", value);
  });
  return str;
};

export default makeUserInfoJsonToString;
