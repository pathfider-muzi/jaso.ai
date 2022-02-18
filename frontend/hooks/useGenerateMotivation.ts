import generateMotivation from "@/api/generateMotivation";
import { Motivation } from "@/types/Motivation";
import { useQuery } from "react-query";

interface Props {
  motivationInfo: Motivation;
  enabled?: boolean;
}

const useGenerateMotivation = ({ motivationInfo, enabled = false }: Props) => {
  const { data, isLoading, isFetching, error, isRefetchError, refetch, isFetched } = useQuery<string>(
    [motivationInfo.orgName],
    () => generateMotivation(motivationInfo),
    {
      enabled
    }
  );

  return {
    error,
    isFetching,
    isFetched,
    isRefetchError,
    motivation: data,
    refetch
  };
};

export default useGenerateMotivation;
