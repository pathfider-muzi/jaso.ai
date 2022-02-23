import searchIntroductions from "@/api/searchIntroduction";
import SearchMetaInfo from "@/types/searchIntroductions";
import { useQuery } from "react-query";

interface Props {
  enabled?: boolean;
  searchMetaInfo: SearchMetaInfo;
}

const useSearchIntroductions = ({ enabled = true, searchMetaInfo }: Props) => {
  const { data, refetch, isLoading } = useQuery(["searchIntroductions"], () => searchIntroductions(searchMetaInfo), {
    enabled
  });

  return {
    data,
    refetch,
    isLoading
  };
};

export default useSearchIntroductions;
