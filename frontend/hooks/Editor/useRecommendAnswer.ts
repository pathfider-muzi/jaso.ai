import getRecommendAnswers from "@/api/recommendAnswers";
import { InfoForRecommendAnswer } from "@/types/recommendAnswer";
import { useQuery } from "react-query";

interface Props {
  enabled?: boolean;
  metaInfo: InfoForRecommendAnswer;
}

const useRecommendAnswers = ({ enabled = true, metaInfo }: Props) => {
  const { data, refetch } = useQuery(["recommendAnswers"], () => getRecommendAnswers(metaInfo), {
    enabled
  });

  return {
    data,
    refetch
  };
};

export default useRecommendAnswers;
