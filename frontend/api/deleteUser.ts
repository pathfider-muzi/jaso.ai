import request from "@/utils/request";

const deleteUser = async () => {
  const response = await request.delete("/user");

  return response.data;
};

export default deleteUser;
