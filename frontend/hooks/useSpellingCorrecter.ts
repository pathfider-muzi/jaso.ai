import getSpellCheckResult from "@/api/getSpellCheckResult";
import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { useQueries } from "react-query";

const getErrorInfo = (fixedHTML: string) => {
  const errorTextInfo = Object.keys(NAVER_SPELL_CHECK_RESULT_INFO).find(className => {
    return fixedHTML.includes(className);
  }) as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;

  return NAVER_SPELL_CHECK_RESULT_INFO[errorTextInfo];
};

export interface SpellingCorrecterData {
  positionIndex: number;
  fixedText: string;
  originalHTML: string;
  errorInfo?: ReturnType<typeof getErrorInfo>;
  isCorrect: boolean;
}

interface Props {
  text: string;
}

const useSpellingCorrecter = ({ text }: Props) => {
  const words = text.split(" ");
  const [data, setData] = useState<SpellingCorrecterData[]>([]);
  const [isTurnOnSpellCheck, setIsTurnOnSpellCheck] = useState(true);
  const spellingResultsRefs = useRef<RefObject<HTMLSpanElement>[]>();

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

  const isLoadingAll = results.every(result => result.isLoading);
  const isFetchedAll = results.every(result => result.isFetched);
  const errorData = data?.filter(_data => !_data.isCorrect) || [];

  const getSpellInfo = () => {
    Promise.allSettled(results.map(result => result.refetch()));
    setIsTurnOnSpellCheck(true);
  };

  useEffect(() => {
    spellingResultsRefs.current = Array.from(
      {
        length: 10000
      },
      () => createRef<HTMLSpanElement>()
    );
  }, [words.length]);

  useEffect(() => {
    if (isTurnOnSpellCheck) {
      if (isLoadingAll) return;

      const newData: SpellingCorrecterData[] = results.map((result, index) => {
        const fixedText =
          result.data?.message.result.notag_html
            .replaceAll("<br>", "\n")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">") || "";
        const originalHTML =
          result.data?.message.result.origin_html
            .replaceAll("<br>", "\n")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">") || "";
        const isCorrect = result.data?.message.result.errata_count === 0;

        return {
          positionIndex: index,
          fixedText,
          originalHTML,
          errorInfo: result.data ? getErrorInfo(result.data.message.result.html) : undefined,
          isCorrect
        };
      });

      setData(newData);
    } else {
      if (isLoadingAll) return;

      const newData: SpellingCorrecterData[] = words.map((word, index) => {
        return {
          positionIndex: index,
          fixedText: word,
          originalHTML: word,
          errorInfo: undefined,
          isCorrect: true
        };
      });

      setData(newData);
    }
  }, [
    text,
    isTurnOnSpellCheck,
    isLoadingAll,
    JSON.stringify(results.map(result => result.data?.message.result.origin_html))
  ]);

  return {
    errorCount: errorData?.length || 0,
    data,
    spellingResultsRefs,
    errorData,
    originalData: words,
    getSpellInfo,
    isLoadingAll,
    isFetchedAll
  };
};

export default useSpellingCorrecter;
