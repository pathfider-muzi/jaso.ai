import { AdditionalInfo } from "@/types/AdditionalInfo";
import { User } from "@/types/User";
import request from "@/utils/request";

type UpdateUserInfoRequestParameter = Pick<User["userInfos"][0], "name" | "email"> & AdditionalInfo;

const updateUserInfo = async (param: UpdateUserInfoRequestParameter) => {
  const response = await request.patch("/user/user-info", {
    ...param
  });

  const isSuccess = response.data.affected === 1;

  return isSuccess;
};

export default updateUserInfo;
