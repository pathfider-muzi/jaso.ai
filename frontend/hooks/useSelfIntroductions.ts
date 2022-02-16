import createQna from "@/api/createQna";
import createSelfIntroduction from "@/api/createSelfIntroduction";
import _deleteSelfIntroduction from "@/api/deleteSelfIntroduction";
import getSelfIntroductions from "@/api/getSelfIntroductions";
import updateSelfIntroduction from "@/api/updateSelfIntroduction";
import { parseISO } from "date-fns";
import compareDesc from "date-fns/compareDesc";
import { useMutation, useQuery } from "react-query";

interface Props {
  enabled?: boolean;
}

const useSelfIntroductions = ({ enabled = true }: Props) => {
  const {
    data: _selfIntroductions,
    refetch: refetchSelfIntroductions,
    error,
    isFetched,
    isLoading
  } = useQuery(["selfIntroductions"], getSelfIntroductions, {
    enabled
  });

  const qnaCreateMutation = useMutation(createQna);

  const selfIntroductionCreateMutation = useMutation(createSelfIntroduction, {
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

  const selfIntroductionUpdateMutation = useMutation(updateSelfIntroduction);

  const { mutate: deleteSelfIntroduction } = useMutation(_deleteSelfIntroduction, {
    onSuccess: () => {
      refetchSelfIntroductions();
    }
  });

  const sortedSelfIntroductions =
    _selfIntroductions?.sort((prev, curr) => {
      return compareDesc(parseISO(prev.updatedDate.toString()), parseISO(curr.updatedDate.toString()));
    }) || [];

  return {
    selfIntroductions: sortedSelfIntroductions,
    refetchSelfIntroductions,
    deleteSelfIntroduction,
    error,
    isFetched,
    isLoading,
    createSelfIntroduction: selfIntroductionCreateMutation.mutate,
    updateSelfIntroduction: selfIntroductionUpdateMutation.mutate
  };
};

export default useSelfIntroductions;
