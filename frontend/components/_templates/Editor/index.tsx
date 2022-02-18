import BRAND_NAME from "@/constants/brandName";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import useTextArea from "@/hooks/useTextArea";
import { useState } from "react";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import * as S from "./styles";

interface Props {
  selfIntroduction: SelfIntroduction;
}

const Editor = ({ selfIntroduction }: Props) => {
  const { input: question, setInput: setQuestion, onChangeInput: onChangeQuestion } = useTextArea("");
  const { input: answer, setInput: setAnswer, onChangeInput: onChangeAnswer } = useTextArea("");

  const {
    getSpellInfo,
    originalData: originalSpellingData,
    isFetchedAll,
    isLoadingAll,
    spellingResultsRefs,
    data: spellingCorrectorData,
    errorData: errorSpellingData
  } = useSpellingCorrecter({
    text: answer
  });

  const [isEmphasizedQuestion, setEmphasizedQuestion] = useState(false);

  return (
    <S.Screen title="에디터" description={`AI 자소서 assistant, ${BRAND_NAME} 에디터`}>
      <S.Frame>
        <S.EditorForm
          selfIntroduction={selfIntroduction}
          question={question}
          setQuestion={setQuestion}
          onChangeQuestion={onChangeQuestion}
          answer={answer}
          setAnswer={setAnswer}
          onChangeAnswer={onChangeAnswer}
          spellingCorrectorData={spellingCorrectorData}
          spellingResultsRefs={spellingResultsRefs}
          originalSpellingData={originalSpellingData}
          isEmphasizedQuestion={isEmphasizedQuestion}
        />

        <S.EditorSidebar
          setEmphasizedQuestion={setEmphasizedQuestion}
          spellingCorrectorData={spellingCorrectorData}
          originalSpellingData={originalSpellingData}
          isFetchedAll={isFetchedAll}
          isLoadingAll={isLoadingAll}
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
