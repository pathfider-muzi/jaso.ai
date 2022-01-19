import getSpellCheckResult from "@/api/getSpellCheckResult";
import { useQuery } from "react-query";

interface Props {
  text: string;
}

interface SpellCheckType {
  message: {
    result: {
      errata_count: number;
      origin_html: string;
      html: string;
      notag_html: string;
    };
  };
}

const useSpellCheck = ({ text }: Props) => {
  const { data, isLoading, refetch } = useQuery<SpellCheckType>(["spellCheck", text], () => getSpellCheckResult(text), {
    enabled: false
  });

  return {
    errorCount: data?.message.result.errata_count || 0,
    fixedText: data?.message.result.notag_html || "",
    originalHTML: data?.message.result.origin_html || "<span></span>",
    fixedHTML: data?.message.result.html || "<span></span>",
    isLoading,
    refetch
  };
};

export default useSpellCheck;
