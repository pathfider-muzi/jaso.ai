import { User } from "@/types/User";
import request from "@/utils/request";

const getUser = async () => {
  const response = await request.get("/user");

  return response.data as User;
};

export default getUser;
