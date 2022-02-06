import { Body } from "@/components/_templates/SignUp/styles";
import { Qna } from "@/hooks/Editor/useQna";
import axios from "axios";

const QNA_API_ENDPOINT = "/selfIntroduction";

export const createQna = async (qna: Qna) => {
  const response = await axios.post(`${QNA_API_ENDPOINT}`, qna);
  return;
};

export const updateQna = async (qna: Omit<Qna, "qnaId">) => {
  const response = await axios.patch(`${QNA_API_ENDPOINT}`, qna);
};
