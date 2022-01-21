import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import * as S from "./styles";

interface Props {
  text: string;
}

const SpellingCorrectResult = ({ text, ...props }: Props) => {
  const { data, originalData, isFetchedAll, errorData } = useSpellingCorrecter({
    text
  });

  return (
    <S.Frame {...props}>
      {isFetchedAll && (
        <>
          {errorData?.map(word => {
            return (
              <div key={word.fixedText + word.positionIndex}>
                <div>
                  <S.OriginalText>{originalData[word.positionIndex]}</S.OriginalText>
                  <span>{" → "}</span>
                  <S.FixedText type="button">{word.fixedText}</S.FixedText>
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
