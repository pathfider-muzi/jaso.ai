import NAVER_SPELL_CHECK_RESULT_INFO from "@/constants/naverSpellCheckResultInfo";
import useSpellCheck from "@/hooks/api/useSpellCheck";
import useInput from "@/hooks/useInput";
import { FormEventHandler } from "react";
import * as S from "./styles";

interface Props {
  defaultText?: string;
}

const SpellChecker = ({ defaultText, ...props }: Props) => {
  const { input, onChangeInput } = useInput(defaultText || "");
  const {
    errorCount,
    fixedText,
    originalHTML,
    fixedHTML,
    refetch: getSpellCheck
  } = useSpellCheck({
    text: input
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    getSpellCheck();
  };

  return (
    <S.Frame {...props}>
      <S.SpellCheckForm onSubmit={onSubmit}>
        <S.TextArea placeholder="입력" onChange={onChangeInput} value={input} spellCheck="true" />
        <S.SummitButton type="submit">맞춤법검사</S.SummitButton>
      </S.SpellCheckForm>
      <S.ResultArea>
        <S.ErrorCount>틀린개수: {errorCount}</S.ErrorCount>
        <S.OriginalText dangerouslySetInnerHTML={{ __html: originalHTML }} />
        <span>To</span>
        <S.FixedText dangerouslySetInnerHTML={{ __html: fixedHTML }} />
      </S.ResultArea>
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

export default SpellChecker;
