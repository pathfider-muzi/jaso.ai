import BRAND_NAME from "@/constants/brandName";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import useTextArea from "@/hooks/useTextArea";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import * as S from "./styles";

interface Props {
  selfIntroduction: SelfIntroduction;
}

const Editor = ({ selfIntroduction }: Props) => {
  const {
    input: question,
    setInput: setQuestion,
    onChangeInput: onChangeQuestion,
    textAreaRef: questionTextAreaRef
  } = useTextArea("");

  const {
    input: answer,
    setInput: setAnswer,
    onChangeInput: onChangeAnswer,
    textAreaRef: answerTextAreaRef
  } = useTextArea("");

  const {
    getSpellInfo,
    originalData: originalSpellingData,
    isFetchedAll,
    spellingResultsRefs,
    data: spellingCorrectorData,
    errorData: errorSpellingData
  } = useSpellingCorrecter({
    text: answer
  });

  return (
    <S.Screen title="에디터" description={`AI 자소서 assistant, ${BRAND_NAME} 에디터`}>
      <S.Frame>
        <S.EditorForm
          selfIntroduction={selfIntroduction}
          question={question}
          setQuestion={setQuestion}
          onChangeQuestion={onChangeQuestion}
          questionTextAreaRef={questionTextAreaRef}
          answer={answer}
          setAnswer={setAnswer}
          onChangeAnswer={onChangeAnswer}
          answerTextAreaRef={answerTextAreaRef}
          spellingCorrectorData={spellingCorrectorData}
          spellingResultsRefs={spellingResultsRefs}
          originalSpellingData={originalSpellingData}
        />

        <S.EditorSidebar
          spellingCorrectorData={spellingCorrectorData}
          originalSpellingData={originalSpellingData}
          isFetchedAll={isFetchedAll}
          spellingResultsRefs={spellingResultsRefs}
          getSpellInfo={getSpellInfo}
          answer={answer}
          setAnswer={setAnswer}
          errorSpellingData={errorSpellingData}
        />
      </S.Frame>
    </S.Screen>
  );
};

export default Editor;
