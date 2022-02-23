import generateMotivation from "@/api/generateMotivation";
import { Motivation } from "@/types/Motivation";
import { useQuery } from "react-query";
import useUser from "./useUser";

interface Props {
  motivationInfo: Motivation;
  enabled?: boolean;
}

const useGenerateMotivation = ({ motivationInfo, enabled = false }: Props) => {
  const { user } = useUser({ enabled: false });

  const { data, isLoading, isFetching, error, isRefetchError, refetch, isFetched } = useQuery<string>(
    [motivationInfo.orgName],
    () => generateMotivation(motivationInfo, !!user),
    {
      enabled,
      retry: 0
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
