import { useMemo } from "react";
import { useQueries } from "react-query";
import getSpellCheckResult from "../api/getSpellCheckResult";
import NAVER_SPELL_CHECK_RESULT_INFO from "../constants/naverSpellCheckResultInfo";

interface Props {
  text: string;
}

const SPLITTER = " ";

const getErrorInfo = (fixedHTML: string) => {
  const errorTextInfo = Object.keys(NAVER_SPELL_CHECK_RESULT_INFO).find(className => {
    return fixedHTML.includes(className);
  }) as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;

  return NAVER_SPELL_CHECK_RESULT_INFO[errorTextInfo];
};

const refineText = (str: string) => {
  return str.trim().replaceAll("\n", " ").replaceAll("<br>", " ");
};

const useSpellingCorrecter = ({ text }: Props) => {
  const words = text.split(SPLITTER).map(refineText);

  const results = useQueries(
    words.map(word => {
      return {
        queryKey: ["word", word],
        queryFn: () => {
          return getSpellCheckResult(word);
        },
        enabled: false,
        cacheTime: 60 * 60,
        retry: 1
      };
    })
  );

  const { isLoadingAll, isFetchedAll } = useMemo(() => {
    return {
      isLoadingAll: results.every(result => result.isLoading),
      isFetchedAll: results.every(result => result.isFetched)
    };
  }, [results]);

  const data = useMemo(() => {
    if (!isFetchedAll) return;

    return results.map((result, index) => {
      const fixedText = result.data?.message.result.notag_html || "";

      return {
        positionIndex: index,
        fixedText,
        errorInfo: getErrorInfo(result.data?.message.result.html || ""),
        isCorrect: fixedText === words[index]
      };
    });
  }, [isFetchedAll, results, words]);

  const errorData = useMemo(() => {
    return data?.filter(_data => !_data.isCorrect);
  }, [data]);

  const getSpellInfo = () => {
    results.map(result => result.refetch());
  };

  return {
    errorCount: errorData?.length,
    data,
    errorData,
    originalData: words,
    getSpellInfo,
    isLoadingAll,
    isFetchedAll
  };
};

export default useSpellingCorrecter;
