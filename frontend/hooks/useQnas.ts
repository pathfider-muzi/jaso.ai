import getQnas from "@/api/getQnas";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { useQuery } from "react-query";

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

  return {
    data,
    refetch,
    isLoading,
    isFetched,
    error
  };
};

export default useQnas;
