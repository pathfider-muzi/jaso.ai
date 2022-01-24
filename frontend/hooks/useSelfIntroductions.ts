import createQna from "@/api/createQna";
import createSelfIntroduction from "@/api/createSelfIntroduction";
import getSelfIntroductions from "@/api/getSelfIntroductions";
import { parseISO } from "date-fns";
import compareAsc from "date-fns/compareAsc";
import { useMutation, useQuery } from "react-query";

interface Props {
  enabled?: boolean;
}

const useSelfIntroductions = ({ enabled = true }: Props) => {
  const {
    data: _selfIntroductions,
    refetch: refetchSelfIntroductions,
    isError,
    isFetched,
    isLoading
  } = useQuery(["selfIntroductions"], getSelfIntroductions, {
    enabled
  });

  const qnaCreateMutation = useMutation(createQna);
  const mutation = useMutation(createSelfIntroduction, {
    onSuccess: ({ id }) => {
      qnaCreateMutation.mutate({
        selfIntroductionId: id,
        question: "",
        answer: "",
        maxCount: 10000
      });
      refetchSelfIntroductions();
    }
  });

  const sortedSelfIntroductions =
    _selfIntroductions?.sort((prev, curr) => {
      return compareAsc(parseISO(prev.updatedDate.toString()), parseISO(curr.updatedDate.toString()));
    }) || [];

  return {
    selfIntroductions: sortedSelfIntroductions,
    refetchSelfIntroductions,
    isError,
    isFetched,
    isLoading,
    createSelfIntroduction: mutation.mutate
  };
};

export default useSelfIntroductions;
