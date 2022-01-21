import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import { createRef, MouseEventHandler } from "react";
import * as S from "./styles";

interface Props {
  text: string;
  originalData: ReturnType<typeof useSpellingCorrecter>["originalData"];
  data: ReturnType<typeof useSpellingCorrecter>["data"];
  isFetchedAll: boolean;
  spellingResultsRefs: ReturnType<typeof createRef>[];
}

const SpellingCorrectResult = ({ originalData, isFetchedAll, data, text, spellingResultsRefs, ...props }: Props) => {
  const onMouseOverFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs[wordIndexAsNumber].current as HTMLElement;
    $element.setAttribute("style", `box-shadow: 0 0 0 1px ${data[wordIndexAsNumber].errorInfo?.color} inset;`);
  };

  const onMouseOutFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs[wordIndexAsNumber].current as HTMLElement;
    $element.setAttribute("style", `box-shadow: none;`);
  };

  const onClickFixedText: MouseEventHandler<HTMLButtonElement> = event => {
    const { wordIndex } = (event.target as HTMLElement).dataset;
    if (!wordIndex) return;
    const wordIndexAsNumber = Number(wordIndex);
    const $element = spellingResultsRefs[wordIndexAsNumber].current as HTMLElement;
    $element.textContent = data[wordIndexAsNumber].fixedText;
    $element.classList.remove(`error-color-${data[wordIndexAsNumber].errorInfo?.className}`);
  };

  return (
    <S.Frame {...props}>
      {isFetchedAll && (
        <>
          {data.map(result => {
            if (!result.errorInfo?.category) {
              return null;
            }
            return (
              <div key={result.fixedText + result.positionIndex}>
                <div>
                  <S.OriginalText>{originalData[result.positionIndex]}</S.OriginalText>
                  <span>{" → "}</span>
                  <S.FixedText
                    type="button"
                    data-word-index={result.positionIndex}
                    onMouseOver={onMouseOverFixedText}
                    onMouseOut={onMouseOutFixedText}
                    onClick={onClickFixedText}
                  >
                    {result.fixedText}
                  </S.FixedText>
                </div>
              </div>
            );
          })}
        </>
      )}
    </S.Frame>
  );
};

export default SpellingCorrectResult;
