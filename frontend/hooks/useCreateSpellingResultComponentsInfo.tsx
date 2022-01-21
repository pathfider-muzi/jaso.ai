import { createRef, useEffect, useState } from "react";
import { SpellingCorrecterData } from "./useSpellingCorrecter";

interface Props {
  spellingCorrecterResults: SpellingCorrecterData[];
  originalWords: string[];
}

const useCreateSpellingResultComponentsInfo = ({ spellingCorrecterResults, originalWords }: Props) => {
  const [refs, setRefs] = useState(
    Array.from(
      {
        length: spellingCorrecterResults.length
      },
      () => createRef<HTMLSpanElement>()
    )
  );

  useEffect(() => {
    setRefs(
      Array.from(
        {
          length: spellingCorrecterResults.length
        },
        () => createRef<HTMLSpanElement>()
      )
    );
  }, [spellingCorrecterResults]);

  return {
    refs,
    components: (
      <>
        {spellingCorrecterResults.map((spellingCorrecterResult, index) => {
          const element = (
            <span
              key={spellingCorrecterResult.positionIndex + spellingCorrecterResult.fixedText}
              ref={refs[index]}
              className={
                spellingCorrecterResult.isCorrect ? "" : `error-color-${spellingCorrecterResult.errorInfo?.className}`
              }
              data-word-index={spellingCorrecterResult.positionIndex}
            >
              {originalWords[spellingCorrecterResult.positionIndex]}
            </span>
          );

          return element;
        })}
      </>
    )
  };
};

export default useCreateSpellingResultComponentsInfo;
