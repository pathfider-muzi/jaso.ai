import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import { MouseEventHandler, MutableRefObject, RefObject } from "react";
import * as S from "./styles";

interface Props {
  originalData: ReturnType<typeof useSpellingCorrecter>["originalData"];
  errorSpellingData: ReturnType<typeof useSpellingCorrecter>["errorData"];
  data: ReturnType<typeof useSpellingCorrecter>["data"];
  isFetchedAll: boolean;
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
      {
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
      }

      <S.ColorInfo>
        {Object.keys(NAVER_SPELL_CHECK_RESULT_INFO).map(key => {
          const colorInfo = key as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;
          const category = NAVER_SPELL_CHECK_RESULT_INFO[colorInfo].category;

          return (
            <S.LabeledText colorInfo={colorInfo} key={colorInfo}>
              {category}
            </S.LabeledText>
          );
        })}
      </S.ColorInfo>
    </S.Frame>
  );
};

export default SpellingCorrectResult;
