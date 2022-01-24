import { Qna } from "@/types/Qna";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

interface Props {
  selfIntroductionId: SelfIntroduction["id"];
  question: Qna["question"];
  answer: Qna["answer"];
  maxCount: Qna["maxCount"];
}

const createQna = async ({ selfIntroductionId, question, answer, maxCount }: Props) => {
  const response = await request.post(`/qna`, {
    selfIntroductionId,
    question,
    answer,
    maxCount
  });

  const data = response.data as {
    identifiers: {
      id: number;
    }[];
  };

  const qnaId = data.identifiers[0];

  return qnaId;
};

export default createQna;
