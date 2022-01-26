import getSpellCheckResult from "@/api/getSpellCheckResult";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import { SpellCorrecterResponseType } from "@/types/SpellCorrecterResponse";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { createRef, RefObject, useEffect, useMemo, useRef } from "react";
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
  const spellingResultsRefs = useRef<RefObject<HTMLSpanElement>[]>();

  const results = useQueries(
    words.map(word => {
      return {
        queryKey: ["word", word],
        queryFn: () => {
          const isExistWordSet = !!getLocalStorage(LOCAL_STORAGE_KEY.SPELLING_WORD_SET);
          if (!isExistWordSet) {
            setLocalStorage(LOCAL_STORAGE_KEY.SPELLING_WORD_SET, {});
          }

          const wordSet = getLocalStorage(LOCAL_STORAGE_KEY.SPELLING_WORD_SET) as {
            [key in string]: SpellCorrecterResponseType;
          };

          if (!!wordSet[word]) {
            const data = new Promise(resolve => {
              resolve(wordSet[word]);
            }) as Promise<SpellCorrecterResponseType>;

            return data;
          }

          return getSpellCheckResult(word);
        },
        enabled: false,
        retry: 0
      };
    })
  );

  const isLoadingAll = useMemo(() => {
    return results.some(result => result.isLoading);
  }, [results]);
  const isRefetchingAll = useMemo(() => {
    return results.some(result => result.isRefetching);
  }, [results]);
  const isFetchedAll = useMemo(() => {
    return results.some(result => result.isFetched);
  }, [results]);

  const getSpellInfo = () => {
    Promise.allSettled(results.map(result => result.refetch()));
  };

  useEffect(() => {
    spellingResultsRefs.current = Array.from(
      {
        length: 10000
      },
      () => createRef<HTMLSpanElement>()
    );
  }, [words.length]);

  const data = useMemo(() => {
    return results.map((result, index) => {
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

      const errorInfo = result.data ? getErrorInfo(result.data.message.result.html) : undefined;
      const isCorrect = !errorInfo;

      return {
        positionIndex: index,
        fixedText,
        originalHTML,
        errorInfo,
        isCorrect
      };
    });
  }, [results]);

  const errorData = useMemo(() => {
    return data.filter(_data => !_data.isCorrect) || [];
  }, [data]);

  return {
    errorCount: errorData?.length || 0,
    data,
    spellingResultsRefs,
    errorData,
    originalData: words,
    getSpellInfo,
    isLoadingAll,
    isFetchedAll,
    isRefetchingAll
  };
};

export default useSpellingCorrecter;
