import { Qna } from "@/types/Qna";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import request from "@/utils/request";

interface Props {
  qnaId: Qna["id"];
  selfIntroductionId: SelfIntroduction["id"];
}

const deleteQna = async ({ qnaId, selfIntroductionId }: Props) => {
  const response = await request.delete(`/qna/${qnaId}?selfIntroductionId=${selfIntroductionId}`);

  const data = response.data as {
    affected: number;
  };

  const isSuccess = !!data.affected;

  return isSuccess;
};

export default deleteQna;
