import SelfIntroductionContent from "@/components/Editor/SelfIntroductionContent";
import SpellingCorrectResult from "@/components/Editor/SpellingCorrectResult";
import useInput from "@/hooks/useInput";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";

const TestForm = () => {
  const { input, onChangeInput } = useInput(`안녕하세요. 외안되
  
  
  아버지가방에들어가신다`);

  const { getSpellInfo, children, originalData, isFetchedAll, errorData, spellingResultsRefs, data } =
    useSpellingCorrecter({
      text: input
    });

  const onClickButton = () => {
    getSpellInfo();
  };

  return (
    <>
      <SelfIntroductionContent text={input} onChange={onChangeInput}>
        {children}
      </SelfIntroductionContent>
      <SpellingCorrectResult
        text={input}
        originalData={originalData}
        isFetchedAll={isFetchedAll}
        data={data}
        spellingResultsRefs={spellingResultsRefs}
      />
      <button type="button" onClick={onClickButton}>
        맞춤법 검사버튼
      </button>
    </>
  );
};

export default TestForm;
