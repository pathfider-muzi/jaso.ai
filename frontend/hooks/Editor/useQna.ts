import { createQna } from "@/api/editor/crudQna";
import { useQuery } from "react-query";

export interface Qna {
  selfIntroductionId: number;
  question: string;
  answer: string;
  maxCount: number;
  qnaId?: number;
}

interface Props {
  qna: Qna;
}

const useSavingContents = ({ qna }: Props) => {
  const { data, status } = useQuery(["createQna", qna], () => createQna(qna));
};

export default useSavingContents;
