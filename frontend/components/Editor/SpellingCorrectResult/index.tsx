import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import Image from "next/image";
import { MouseEventHandler, MutableRefObject, RefObject } from "react";
import * as S from "./styles";

interface Props {
  originalData: ReturnType<typeof useSpellingCorrecter>["originalData"];
  errorSpellingData: ReturnType<typeof useSpellingCorrecter>["errorData"];
  data: ReturnType<typeof useSpellingCorrecter>["data"];
  isFetchedAll: boolean;
  isLoadingAll: boolean;
  spellingResultsRefs: MutableRefObject<RefObject<HTMLSpanElement>[] | undefined>;
  setAnswer: (value: string) => void;
  answer: string;
  getSpellInfo: () => void;
}

const SpellingCorrectResult = ({
  answer,
  setAnswer,
  originalData,
  isFetchedAll,
  isLoadingAll,
  data,
  spellingResultsRefs,
  errorSpellingData,
  getSpellInfo,
  ...props
}: Props) => {
  const onMouseOverFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    if (!spellingResultsRefs.current) return;
    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs.current[wordIndexAsNumber].current as HTMLElement;
    if (!$element) return;
    $element.setAttribute("style", `box-shadow: 0 0 0 1px ${data[wordIndexAsNumber].errorInfo?.color} inset;`);
  };

  const onMouseOutFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    if (!spellingResultsRefs.current) return;
    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs.current[wordIndexAsNumber].current as HTMLElement;
    if (!$element) return;
    $element.setAttribute("style", `box-shadow: none;`);
  };

  const onClickFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    if (!spellingResultsRefs.current) return;

    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs.current[wordIndexAsNumber].current as HTMLElement;
    if (!$element?.textContent) return;

    const newAnswerTextAreaInput = answer.replaceAll($element.textContent.trim(), data[wordIndexAsNumber].fixedText);
    getSpellInfo();

    setAnswer(newAnswerTextAreaInput);

    $element.textContent = data[wordIndexAsNumber].fixedText;
    $element.classList.remove(`error-color-${data[wordIndexAsNumber].errorInfo?.className}`);
  };

  return (
    <S.Frame {...props}>
      {isLoadingAll ? (
        <S.LoadingImageWrapper>
          <Image src="/loading.svg" alt="loading image" width="100" height="100" />
        </S.LoadingImageWrapper>
      ) : (
        <>
          {errorSpellingData.length > 0 ? (
            errorSpellingData.map(result => {
              if (!result.errorInfo?.category) return null;

              return (
                <div key={result.fixedText + result.positionIndex}>
                  <S.ErrorResultWrapper>
                    <S.OriginalText>{originalData[result.positionIndex]}</S.OriginalText>
                    <span>{" → "}</span>
                    <S.FixedText
                      type="button"
                      data-word-index={result.positionIndex}
                      onMouseOver={onMouseOverFixedText}
                      onMouseOut={onMouseOutFixedText}
                      onClick={onClickFixedText}
                      errorColor={result.errorInfo.color}
                    >
                      {result.fixedText}
                    </S.FixedText>
                  </S.ErrorResultWrapper>
                </div>
              );
            })
          ) : (
            <>틀린 맞춤법이 없습니다.</>
          )}
        </>
      )}
    </S.Frame>
  );
};

export default SpellingCorrectResult;
