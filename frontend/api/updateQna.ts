import { Qna } from "@/types/Qna";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

interface Props extends Pick<Qna, "id" | "question" | "answer" | "maxCount"> {
  selfIntroductionId: SelfIntroduction["id"];
}

const updateQna = async ({ selfIntroductionId, id, question, answer, maxCount }: Props) => {
  const response = await request.patch("/qna", {
    selfIntroductionId,
    id,
    question,
    answer,
    maxCount
  });

  const data = response.data as {
    affected: boolean;
  };

  const isSuccess = data.affected;

  return isSuccess;
};

export default updateQna;
