import _createQna from "@/api/createQna";
import _deleteQna from "@/api/deleteQna";
import getQnas from "@/api/getQnas";
import _updateQna from "@/api/updateQna";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { useMutation, useQuery } from "react-query";

interface Props {
  enabled?: boolean;
  selfIntroductionId: SelfIntroduction["id"];
}

const useQnas = ({ enabled = true, selfIntroductionId }: Props) => {
  const { data, refetch, isLoading, isFetched, error } = useQuery(
    ["Qnas", selfIntroductionId],
    () => getQnas(selfIntroductionId),
    {
      enabled
    }
  );

  const qnaCreateMutation = useMutation(_createQna);
  const qnaDeleteMutation = useMutation(_deleteQna);
  const qnaUpdateMutation = useMutation(_updateQna);

  return {
    data: data || [],
    refetch,
    isLoading,
    isFetched,
    error,
    deleteQna: qnaDeleteMutation.mutate,
    creatQna: qnaCreateMutation.mutate,
    updateQna: qnaUpdateMutation.mutate
  };
};

export default useQnas;
