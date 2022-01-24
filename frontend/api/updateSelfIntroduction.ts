import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

interface Props extends Pick<SelfIntroduction, "id" | "title" | "organisationName" | "role"> {}

const updateSelfIntroduction = async ({ ...props }: Props) => {
  const response = await request.patch("/self-introduction", {
    ...props
  });

  const data = response.data as {
    affected: boolean;
  };

  const isSuccess = data.affected;

  return isSuccess;
};

export default updateSelfIntroduction;
