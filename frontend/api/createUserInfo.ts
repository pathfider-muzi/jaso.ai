import request from "@/utils/request";

const createUserInfo = async () => {
  const response = await request.post("/user/user-info", {
    name: "Shin",
    email: "eddy.storm@naver.com",
    university: "Kakao Univ",
    major: "economics",
    grade: "4.1",
    languageScore: "990",
    career: "Kakaobrain",
    activity: "Deipher 6th",
    license: "HSK level 5"
  });

  return response.data;
};

export default createUserInfo;
