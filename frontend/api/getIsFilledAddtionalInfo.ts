import request from "@/utils/request";

const getIsFilledAdditionalInfo = async () => {
  const response = await request.get("/user/user-info/requirements");

  const data = response.data as {
    hasFilledInRequiredFields: boolean;
  };

  return data.hasFilledInRequiredFields;
};

export default getIsFilledAdditionalInfo;
